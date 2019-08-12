var createScene = function () {
    //hello update pls
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); //sets background color to black
    scene.collisionsEnabled = true;
    
    //top light
    var topLight = new BABYLON.HemisphericLight("topLight", new BABYLON.Vector3(0, 1, 0), scene);
    topLight.intensity = 0.7;

    var botLight = new BABYLON.HemisphericLight("botLight", new BABYLON.Vector3(0, -1, 0), scene);
    botLight.intensity = 0.5;

    var camera = new BABYLON.ArcRotateCamera("camera", (3*Math.PI)/2, Math.PI/4, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    //created grid that will be applied to ground
    var groundGrid = createGrid();
    if(offsetW && offsetH) {       //if odd number given for base and height...
        groundGrid.gridOffset = new BABYLON.Vector3(0.5, 0.5, 0.5);
    }
    if (offsetW) {      //if odd number given for base...
        groundGrid.gridOffset = new BABYLON.Vector3(0.5, 0, 0.5);
    }
    groundGrid.backFaceCulling = false;     //allowing to see "underside" of grid
 
    //standard ground
    ground = BABYLON.MeshBuilder.CreateGround("ground", {width: width, height: width}, scene);
    ground.position.y = -height/2;     //drops ground lower on screen
    ground.material = groundGrid;       //sets ground material to grid

    //creates planes for sides
    var fplane = createPlane(0, 0, -width/2, Math.PI);      //front plane
    var bplane = createPlane(0, 0, width/2, 0); 

    //right & left planes
    var rplane = createPlane(width/2, 0, 0, Math.PI / 2);
    var lplane = createPlane(-width/2, 0, 0, (3 * Math.PI) / 2);
    
    return scene;
};

//prompt to ask for size of grid
// var answer = prompt("What size grid do you want?", "5");
// var width : number = parseInt(answer);
var width = 3;
var offsetW : boolean = false; 
if (width % 2 === 1) {
    offsetW = true;
};

//Change this number to change height :)
var height = 3;
var offsetH : boolean = false;  //if false, height is even and no need for offseting grid
if (height % 2 === 1) {
    offsetH = true;
}

var canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
var engine = new BABYLON.Engine(canvas, true);

window.addEventListener('resize', () => {   //checks if user resizes window
    engine.resize();
});

var scene = createScene();  //where we are; container but NEED camera

engine.runRenderLoop(() => {    //loop that gives new image to system at around 60 fps
    scene.render();
});

var gridData = generateArray(width, height);        //3D array of board

//Z = 1 (back row)
    var box00 = new SmallCube("-1, -1, 1", true, offsetW, offsetH, ground);
    box00.piece.position = new BABYLON.Vector3(-1, -1, 1);
    box00.movement(box00);      //must call movement to place block
    box00.changeState();     //makes block inactive

    var box01 = new SmallCube("0, -1, 1", true, offsetW, offsetH, ground);
    box01.piece.position = new BABYLON.Vector3(0, -1, 1);
    box01.movement(box01);      //must call movement to place block
    box01.changeState();     //makes block inactive

    var box02 = new SmallCube("1, -1, 1", true, offsetW, offsetH, ground);
    box02.piece.position = new BABYLON.Vector3(1, -1, 1);
    box02.movement(box02);      //must call movement to place block
    box02.changeState();     //makes block inactive

//Z = 0 (middle row)
    var box10 = new SmallCube("-1, -1, 1", true, offsetW, offsetH, ground);
    box10.piece.position = new BABYLON.Vector3(-1, -1, 0);
    box10.movement(box10);      //must call movement to place block
    box10.changeState();     //makes block inactive

    var box12 = new SmallCube("1, -1, 1", true, offsetW, offsetH, ground);
    box12.piece.position = new BABYLON.Vector3(1, -1, 0);
    box12.movement(box12);      //must call movement to place block
    box12.changeState();     //makes block inactive

//Z = -1 (front row)
    var box20 = new SmallCube("-1, -1, 1", true, offsetW, offsetH, ground);
    box20.piece.position = new BABYLON.Vector3(-1, -1, -1);
    box20.movement(box20);      //must call movement to place block
    box20.changeState();     //makes block inactive

    var box21 = new SmallCube("0, -1, 1", true, offsetW, offsetH, ground);
    box21.piece.position = new BABYLON.Vector3(0, -1, -1);
    box21.movement(box21);      //must call movement to place block
    box21.changeState();     //makes block inactive

    var box22 = new SmallCube("1, -1, 1", true, offsetW, offsetH, ground);
    box22.piece.position = new BABYLON.Vector3(1, -1, -1);
    box22.movement(box22);      //must call movement to place block
    box22.changeState();     //makes block inactive

console.log(gridData);

var activeBlock = new SmallCube("activeBlock", true, offsetW, offsetH, ground);
activeBlock.piece.position.y += 1;
activeBlock.movement(activeBlock);
console.log(gridData);

/*
 *  Brainstorming for 3D Array:
 *  In essence, we want to get the position of the block when it is locked to the grid, check to see 
 *  where the position would fall in the 3D array, and set that element in the array to "occupied". The
 *  block's locked position should correlate to a spot or spots (depending on the size) in the array
 * 
 *  How to implement?
 *  Each index in the array can correspond to the spots on the board, meaning the index of the first
 *  element would be -width/2 (something like that). Using the position of the box, find the spot
 *  in the array and set the boolean to true. 
 */

/*
 *  With the createArray() function, each index now has (x, y, z) coordinates and a boolean determining whether
 *  the index is empty or not. 
 * 
 *  Now what? What do I want to happen?
 *  After the block is locked, get the (x, y, z) coordinates of the locked block. Find the correlating (x, y, z)
 *  coordinates in the 3D array and change the hasObj property of the element to true. The 3D array will not be
 *  used for collisions, but rather for clearing 3D rows out. If the 3D row (x, z) is full, clear the blocks.
 */


function createGrid () {
    var grid = new BABYLON.GridMaterial("grid", scene);
    grid.lineColor = BABYLON.Color3.White();      //sets line color to white
    grid.majorUnitFrequency = 1;        //every line is a strong line
    grid.opacity = 0.99;        //changes opacity of main line; must be less than 1 in order for empty space to be transparent

    return grid;
};

function createPlane(x : number, y : number, z : number, rotation : number) {
    var planeGrid = createGrid();
    if(offsetW && offsetH) {       //if odd number given for base
        planeGrid.gridOffset = new BABYLON.Vector3(0.5, 0.5, 0);
    } else if (offsetH) {       //if odd number given for height
        planeGrid.gridOffset = new BABYLON.Vector3(0, 0.5, 0.5);
    } else if (offsetW) {
        planeGrid.gridOffset = new BABYLON.Vector3(0.5, 0, 0.5);     //offsets ground grid by half a square
    } else {
        //do nothing
    }
    planeGrid.backFaceCulling = true;
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {height: height, width: width}, scene);
    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = z;
    plane.rotation.y = rotation;
    plane.material = planeGrid;
    plane.checkCollisions = true;
    return plane;
};