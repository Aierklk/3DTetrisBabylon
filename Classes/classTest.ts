var ground;
var createScene = function() {
    
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); //sets background color to black
    scene.collisionsEnabled = true;

    var camera = new BABYLON.ArcRotateCamera("camera", (3*Math.PI)/2, Math.PI/4, 15, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    //top light
    var topLight = new BABYLON.HemisphericLight("topLight", new BABYLON.Vector3(0, 1, 0), scene);
    topLight.intensity = 0.7;

    var botLight = new BABYLON.HemisphericLight("botLight", new BABYLON.Vector3(0, -1, 0), scene);
    botLight.intensity = 0.5;

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
}

//prompt to ask for size of grid
var answer = prompt("What size grid do you want?", "5");
var width : number = parseInt(answer);
var offsetW : boolean = false; 
if (width % 2 === 1) {
    offsetW = true;
};

//Change this number to change height :)
var height = 7;
var offsetH : boolean = false;  //if false, height is even and no need for offseting grid
if (height % 2 === 1) {
    offsetH = true;
}

//NEED to put this code to render the local browser page
var canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
var engine = new BABYLON.Engine(canvas, true);

window.addEventListener('resize', () => {   //checks if user resizes window
    engine.resize();
});

//Must call the function in order to render the scene
var scene = createScene();  //where we are; container but NEED camera

/***** Testing blocks *****/
//TO-DO: Blocks can move halfway into wall; cool cool

    // var smallCube = new SmallCube("smallCube", true, offsetW, offsetH, ground);
    // smallCube.movement(smallCube);

    // var shortTower = new ShortTower("shortTower", true, offsetW, offsetH, ground);
    // shortTower.movement(shortTower);

    // var largeCube = new LargeCube("largeCube", true, offsetW, offsetH, ground);
    // largeCube.movement(largeCube);

    // var miniL = new MiniL("miniL", true, offsetW, offsetH, ground);
    // miniL.movement(miniL);    

    var bigL = new BigL("bigL", true, offsetW, offsetH, ground);
    bigL.movement(bigL);

/***** Testing blocks *****/

engine.runRenderLoop(() => {    //loop that gives new image to system at around 60 fps
    scene.render();
});

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