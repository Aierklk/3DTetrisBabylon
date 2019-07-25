/*
 *  Copied code exactly from Babylon starter playground
 *  Placeholder for launching page
 */
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    //0.7 - only 70% of light source in 3d world
    // Our built-in 'box' shape.
    var box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
    // Move the sphere upward 1/2 its height
    box.position.y = 1;
    // Our built-in 'ground' shape; at pos.y = 0
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    return scene;
};
//host:
var canvas = document.getElementById('renderCanvas');
//casted canvas so TS knows this is a canvas element
var engine = new BABYLON.Engine(canvas, true); //turn on engine
window.addEventListener('resize', function () {
    engine.resize();
});
var scene = createScene();
engine.runRenderLoop(function () {
    scene.render();
});
//# sourceMappingURL=index.js.map