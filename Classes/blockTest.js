var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("camera", (3 * Math.PI) / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    //Shape in X0Z Plane; meaning y = 0 always!
    var corners = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 0, 3),
        new BABYLON.Vector3(1, 0, 3),
        new BABYLON.Vector3(1, 0, 1),
        new BABYLON.Vector3(2, 0, 1),
        new BABYLON.Vector3(2, 0, 0) //bottom right corner
    ];
    //need BABYLON.Mesh.DOUBLESIDE to have solid block
    var polygon = BABYLON.MeshBuilder.CreatePolygon("polygon", { shape: corners, depth: 1, updatable: true, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    return scene;
};
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);
window.addEventListener('resize', function () {
    engine.resize();
});
var scene = createScene(); //where we are; container but NEED camera
engine.runRenderLoop(function () {
    scene.render();
});
//# sourceMappingURL=blockTest.js.map