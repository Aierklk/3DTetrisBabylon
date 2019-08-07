/*
 *  Subclass of Piece for mini "L"
 *  MiniLs are green and shaped like a little L
 *  TO-DO: Block can move half-way into the wall
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MiniL = /** @class */ (function (_super) {
    __extends(MiniL, _super);
    function MiniL(name, isActive, offsetW, offsetH, ground) {
        var _this = _super.call(this, name, isActive, offsetW, offsetH, ground) || this;
        //setting starting positions in XoZ plane; y = 0 ALWAYS
        //coordinates are set as (x, 0, y); no changing z??
        _this._startingPosition = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 0, 2),
            new BABYLON.Vector3(1, 0, 2),
            new BABYLON.Vector3(1, 0, 1),
            new BABYLON.Vector3(2, 0, 1),
            new BABYLON.Vector3(2, 0, 0) //bottom right corner
        ];
        _this.flipCounter = 0;
        //properties specific to MiniL
        _this._color = "green";
        _this._depth = 1;
        //creating physical piece, MiniL
        //need BABYLON.Mesh.DOUBLESIDE to have solid block
        _this._miniL = BABYLON.MeshBuilder.CreatePolygon("miniL", { shape: _this._startingPosition, depth: _this._depth, updatable: true, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
        if (offsetW) {
            _this._miniL.position.z -= _this._shift;
            _this._miniL.position.x -= _this._shift;
        }
        if (offsetH) {
            _this._miniL.position.y -= _this._shift;
        }
        //sets L upright
        _this._startingRotation = (3 * Math.PI) / 2;
        _this._miniL.rotation.x = _this._startingRotation;
        //adding green to material of box
        _this._miniLMaterial = new BABYLON.StandardMaterial("miniLMat", scene);
        _this._miniLMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0); //r: 0, g: 1, b: 0
        //this._miniLMaterial.wireframe = true;
        _this._miniL.material = _this._miniLMaterial;
        return _this;
    }
    Object.defineProperty(MiniL.prototype, "piece", {
        //accesor
        get: function () {
            return this._miniL;
        },
        enumerable: true,
        configurable: true
    });
    /*
     *  Instead of allowing users to rotate by axes, we have defined set rotations that the block can
     *  cycle through. For MiniL, there are four rotations for the protruding cube: right, back, left,
     *  and front. Since the protruding cube can be on top or bottom, there are 8 total unique
     *  rotations.
     *
     *  Protruding cube cases:
     *      0.) lower -- L shaped
     *      1.) higher -- upside L
     *
     *  All rotations and translations are done based on the local axes to simplify the code. Essentially,
     *  the shifts (to stay locked into the grid) are all the same because it depends on the rotation of the
     *  piece as opposed to its relative position to the world axes.
     *
     *  I don't really understand the vectors as they don't coordinate to (x, y, z), but they work so...
     *
     *  Think it is (z, x, y)
     */
    MiniL.prototype.rotate = function (mesh) {
        if (this.flipCounter === 0) { //L shaped
            mesh.rotation.y -= this._rotation;
            mesh.locallyTranslate(new BABYLON.Vector3(0, 1, 0));
        }
        else { //upside down L
            mesh.rotation.y -= this._rotation;
            mesh.locallyTranslate(new BABYLON.Vector3(-1, 0, 0));
        }
    };
    MiniL.prototype.flip = function (mesh) {
        //case 0: protruding cube is lower --> flips down
        if (this.flipCounter === 0) {
            mesh.rotation.x += Math.PI;
            mesh.locallyTranslate(new BABYLON.Vector3(0, 1, -1));
            this.flipCounter = 1;
            //case 1: protruding cube is higher --> flips up
        }
        else {
            mesh.rotation.x -= Math.PI;
            mesh.locallyTranslate(new BABYLON.Vector3(0, 1, -1));
            this.flipCounter = 0;
        }
    };
    return MiniL;
}(Piece));
//# sourceMappingURL=MiniL.js.map