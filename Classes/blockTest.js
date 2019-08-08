var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); //sets background color to black
    scene.collisionsEnabled = true;
    //top light
    var topLight = new BABYLON.HemisphericLight("topLight", new BABYLON.Vector3(0, 1, 0), scene);
    topLight.intensity = 0.7;
    var botLight = new BABYLON.HemisphericLight("botLight", new BABYLON.Vector3(0, -1, 0), scene);
    botLight.intensity = 0.5;
    var camera = new BABYLON.ArcRotateCamera("camera", (3 * Math.PI) / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    //created grid that will be applied to ground
    var groundGrid = createGrid();
    if (offsetW && offsetH) { //if odd number given for base and height...
        groundGrid.gridOffset = new BABYLON.Vector3(0.5, 0.5, 0.5);
    }
    if (offsetW) { //if odd number given for base...
        groundGrid.gridOffset = new BABYLON.Vector3(0.5, 0, 0.5);
    }
    groundGrid.backFaceCulling = false; //allowing to see "underside" of grid
    //standard ground
    ground = BABYLON.MeshBuilder.CreateGround("ground", { width: width, height: width }, scene);
    ground.position.y = -height / 2; //drops ground lower on screen
    ground.material = groundGrid; //sets ground material to grid
    //creates planes for sides
    var fplane = createPlane(0, 0, -width / 2, Math.PI); //front plane
    var bplane = createPlane(0, 0, width / 2, 0);
    //right & left planes
    var rplane = createPlane(width / 2, 0, 0, Math.PI / 2);
    var lplane = createPlane(-width / 2, 0, 0, (3 * Math.PI) / 2);
    return scene;
};
//prompt to ask for size of grid
// var answer = prompt("What size grid do you want?", "5");
// var width : number = parseInt(answer);
var width = 3;
var offsetW = false;
if (width % 2 === 1) {
    offsetW = true;
}
;
//Change this number to change height :)
var height = 3;
var offsetH = false; //if false, height is even and no need for offseting grid
if (height % 2 === 1) {
    offsetH = true;
}
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);
window.addEventListener('resize', function () {
    engine.resize();
});
var scene = createScene(); //where we are; container but NEED camera
var positionArray = new Array(3);
for (var i = 0; i < positionArray.length; i++) {
    positionArray[i] = new Array(3);
    for (var j = 0; j < positionArray[i].length; j++) {
        positionArray[i][j] = new Array(3);
    }
}
console.log(positionArray);
// var box00 = new SmallCube("0, 0", false, offsetW, offsetH, ground);
// box00.piece.position = new BABYLON.Vector3(-1, -1, 1);
// var box01 = new SmallCube("0, 0", false, offsetW, offsetH, ground);
// box01.piece.position = new BABYLON.Vector3(0, -1, 1);
engine.runRenderLoop(function () {
    scene.render();
});
engine.runRenderLoop(function () {
    scene.render();
});
engine.runRenderLoop(function () {
    scene.render();
});
function createGrid() {
    var grid = new BABYLON.GridMaterial("grid", scene);
    grid.lineColor = BABYLON.Color3.White(); //sets line color to white
    grid.majorUnitFrequency = 1; //every line is a strong line
    grid.opacity = 0.99; //changes opacity of main line; must be less than 1 in order for empty space to be transparent
    return grid;
}
;
function createPlane(x, y, z, rotation) {
    var planeGrid = createGrid();
    if (offsetW && offsetH) { //if odd number given for base
        planeGrid.gridOffset = new BABYLON.Vector3(0.5, 0.5, 0);
    }
    else if (offsetH) { //if odd number given for height
        planeGrid.gridOffset = new BABYLON.Vector3(0, 0.5, 0.5);
    }
    else if (offsetW) {
        planeGrid.gridOffset = new BABYLON.Vector3(0.5, 0, 0.5); //offsets ground grid by half a square
    }
    else {
        //do nothing
    }
    planeGrid.backFaceCulling = true;
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", { height: height, width: width }, scene);
    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = z;
    plane.rotation.y = rotation;
    plane.material = planeGrid;
    plane.checkCollisions = true;
    return plane;
}
;
//# sourceMappingURL=blockTest.js.map