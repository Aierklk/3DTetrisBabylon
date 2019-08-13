/*
 *  Subclass for large, 2 by 2 cube
 *  Block can move halfway into the wall
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
var LargeCube = /** @class */ (function (_super) {
    __extends(LargeCube, _super);
    //constructor calls Parent class Piece
    function LargeCube(name, isActive, offsetW, offsetH, ground) {
        var _this = _super.call(this, name, isActive, offsetW, offsetH, ground) || this;
        _this._xStartPosition = 0;
        _this._yStartPosition = 2;
        _this._zStartPosition = 0;
        if (offsetH) {
            _this._yStartPosition -= _this._shift;
        }
        if (offsetW) {
            _this._xStartPosition += _this._shift;
            _this._zStartPosition += _this._shift;
        }
        //properties specific to LargeCube
        _this._size = 2;
        _this._color = "green";
        // //X0Y
        // this._startingPosition = [
        //     new BABYLON.Vector3(0, 0, 0),  //botton left corner
        //     new BABYLON.Vector3(0, 0, 2),  //top left corner
        //     new BABYLON.Vector3(2, 0, 2),  //high right corner
        //     new BABYLON.Vector3(2, 0, 0)   //bottom right corner
        // ];
        // this._depth = 2;
        // //creating physical box
        // this._largeCube = BABYLON.MeshBuilder.CreatePolygon("largeCube", {
        //     shape: this._startingPosition, 
        //     depth: this._depth, 
        //     updatable: true, 
        //     sideOrientation: BABYLON.Mesh.DOUBLESIDE
        // }, scene);
        _this._largeCube = BABYLON.MeshBuilder.CreateBox("largeCube", { width: 2, height: 2, depth: 2 }, scene);
        //setting start position
        _this._largeCube.position.x = _this._xStartPosition;
        _this._largeCube.position.y = _this._yStartPosition;
        _this._largeCube.position.z = _this._zStartPosition;
        //adding color
        _this._largeCubeMaterial = new BABYLON.StandardMaterial("largeCubeMat", scene);
        _this._largeCubeMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);
        _this._largeCube.material = _this._largeCubeMaterial;
        _this.pieceData = generateArray(width, height);
        return _this;
    }
    Object.defineProperty(LargeCube.prototype, "piece", {
        //accessor for getting physical box; needed for getting properties
        get: function () {
            return this._largeCube;
        },
        enumerable: true,
        configurable: true
    });
    LargeCube.prototype.rotate = function (mesh) {
        //do nothing because symmetrical
    };
    LargeCube.prototype.flip = function (mesh) {
        //do nothing because symmetrical
    };
    LargeCube.prototype.placeBlock = function () {
        //coordinates of piece on grid (x, y, z)
        var xPos = this._largeCube.position.x;
        var yPos = this._largeCube.position.y;
        var zPos = this._largeCube.position.z;
        ;
        if (offsetW) {
            xPos -= 0.5;
            zPos -= 0.5;
        }
        if (offsetH) {
            yPos += 0.5;
        }
        console.log("Coords = x: " + xPos + " y: " + yPos + " z: " + zPos);
        var xArr = gridToArray("X", xPos);
        var yArr = gridToArray("Y", yPos);
        var zArr = gridToArray("Z", zPos);
        console.log("Array Indexes = x: " + xArr + " y: " + yArr + " z: " + zArr);
        //sets spot in array (top right corner of block) to true
        this.pieceData[xArr][yArr][zArr] = true; //front top left
        this.pieceData[xArr + 1][yArr][zArr] = true; //front top right
        this.pieceData[xArr][yArr + 1][zArr] = true; //front bottom left
        this.pieceData[xArr + 1][yArr + 1][zArr] = true; //front bottom right
        this.pieceData[xArr][yArr][zArr + 1] = true; //back top left
        this.pieceData[xArr + 1][yArr][zArr + 1] = true; //back top right
        this.pieceData[xArr][yArr + 1][zArr + 1] = true; //back bottom left
        this.pieceData[xArr + 1][yArr + 1][zArr + 1] = true; //back bottom right
    };
    LargeCube.prototype.removeBlock = function () {
        //coordinates of piece on grid (x, y, z)
        var xPos = this._largeCube.position.x;
        var yPos = this._largeCube.position.y;
        var zPos = this._largeCube.position.z;
        ;
        if (offsetW) {
            xPos -= 0.5;
            zPos -= 0.5;
        }
        if (offsetH) {
            yPos += 0.5;
        }
        console.log("Coords = x: " + xPos + " y: " + yPos + " z: " + zPos);
        var xArr = gridToArray("X", xPos);
        var yArr = gridToArray("Y", yPos);
        var zArr = gridToArray("Z", zPos);
        console.log("Array Indexes = x: " + xArr + " y: " + yArr + " z: " + zArr);
        //sets spot in Piece array to false
        this.pieceData[xArr][yArr][zArr] = false; //front top left
        this.pieceData[xArr + 1][yArr][zArr] = false; //front top right
        this.pieceData[xArr][yArr + 1][zArr] = false; //front bottom left
        this.pieceData[xArr + 1][yArr + 1][zArr] = false; //front bottom right
        this.pieceData[xArr][yArr][zArr + 1] = false; //back top left
        this.pieceData[xArr + 1][yArr][zArr + 1] = false; //back top right
        this.pieceData[xArr][yArr + 1][zArr + 1] = false; //back bottom left
        this.pieceData[xArr + 1][yArr + 1][zArr + 1] = false; //back bottom right
        //sets spot in Grid array to false
        gridData[xArr][yArr][zArr] = false; //front top left
        gridData[xArr + 1][yArr][zArr] = false; //front top right
        gridData[xArr][yArr + 1][zArr] = false; //front bottom left
        gridData[xArr + 1][yArr + 1][zArr] = false; //front bottom right
        gridData[xArr][yArr][zArr + 1] = false; //back top left
        gridData[xArr + 1][yArr][zArr + 1] = false; //back top right
        gridData[xArr][yArr + 1][zArr + 1] = false; //back bottom left
        gridData[xArr + 1][yArr + 1][zArr + 1] = false; //back bottom right
    };
    LargeCube.prototype.meshCollisionCheck = function (xPos, yPos, zPos, grid, direction) {
        if (offsetW) {
            xPos -= 0.5;
            zPos -= 0.5;
        }
        if (offsetH) {
            yPos += 0.5;
        }
        console.log("Mesh collision x : " + xPos + " y: " + yPos + " z: " + zPos);
        //coodinates of piece in array [x][y][z]
        var xArr = gridToArray("X", xPos);
        var yArr = gridToArray("Y", yPos);
        var zArr = gridToArray("Z", zPos);
        var dir = direction.toUpperCase();
        switch (dir) {
            case "L": //going left (case "A"); starting square is front top left
                //-1 to original x, nothing to potential x (see code in Piece class) 
                if (grid[xArr][yArr][zArr] === false && //front top left
                    grid[xArr][yArr][zArr + 1] === false && //back top left
                    grid[xArr][yArr + 1][zArr] === false && //front bottom right
                    grid[xArr][yArr + 1][zArr + 1] === false) { //back bottom right
                    return true;
                }
                break;
            case "R": //going right (case "D"); starting square is front top left
                //+2 to original x, +1 to potential x (see code in Piece class)
                if (grid[xArr + 1][yArr][zArr] === false && //front top right
                    grid[xArr + 1][yArr + 1][zArr] === false && //front bottom right
                    grid[xArr + 1][yArr][zArr + 1] === false && //back top right
                    grid[xArr + 1][yArr + 1][zArr + 1] === false) { //back bottom right
                    return true;
                }
                break;
            case "B": //going backwards (key "w")
                //movement is based off the reference point of the block (front-facing top left corner)
                //technically adding +2 to original z (see code in Piece class for key "w"); +1 to potential Z
                if (grid[xArr][yArr][zArr + 1] === false && //top left
                    grid[xArr][yArr + 1][zArr + 1] === false && //bottom left
                    grid[xArr + 1][yArr][zArr + 1] === false && //top right
                    grid[xArr + 1][yArr + 1][zArr + 1] === false) { //bottom right
                    return true;
                }
                break;
            case "F": //going forward (key "s")
                //-1 to original z, nothing to potential z (see subtraction in Piece class)
                if (grid[xArr][yArr][zArr] === false && //top left
                    grid[xArr][yArr + 1][zArr] === false && //bottom left
                    grid[xArr + 1][yArr][zArr] === false && //top right
                    grid[xArr + 1][yArr + 1][zArr] === false) { //bottom right
                    return true;
                }
                break;
        }
        return false;
    };
    LargeCube.prototype.placeObject = function (objectArray) {
        //coordinates of piece on grid (x, y, z)
        var xPos = this._largeCube.position.x;
        var yPos = this._largeCube.position.y;
        var zPos = this._largeCube.position.z;
        if (offsetW) {
            xPos -= 0.5;
            zPos -= 0.5;
        }
        if (offsetH) {
            yPos += 0.5;
        }
        var xArr = gridToArray("X", xPos);
        var yArr = gridToArray("Y", yPos);
        var zArr = gridToArray("Z", zPos);
        //sets spot in array (top left corner of block) to true
        objectArray[xArr][yArr][zArr] = this._largeCube; //front top left
        objectArray[xArr + 1][yArr][zArr] = this._largeCube; //front top right
        objectArray[xArr][yArr + 1][zArr] = this._largeCube; //front bottom left
        objectArray[xArr + 1][yArr + 1][zArr] = this._largeCube; //front bottom right
        objectArray[xArr][yArr][zArr + 1] = this._largeCube; //back top left
        objectArray[xArr + 1][yArr][zArr + 1] = this._largeCube; //back top right
        objectArray[xArr][yArr + 1][zArr + 1] = this._largeCube; //back bottom left
        objectArray[xArr + 1][yArr + 1][zArr + 1] = this._largeCube; //back bottom right
    };
    LargeCube.prototype.removeObject = function (objectArray) {
        //coordinates of piece on grid (x, y, z)
        var xPos = this._largeCube.position.x;
        var yPos = this._largeCube.position.y;
        var zPos = this._largeCube.position.z;
        if (offsetW) {
            xPos -= 0.5;
            zPos -= 0.5;
        }
        if (offsetH) {
            yPos += 0.5;
        }
        var xArr = gridToArray("X", xPos);
        var yArr = gridToArray("Y", yPos);
        var zArr = gridToArray("Z", zPos);
        //sets spot in array (top left corner of block) to true
        objectArray[xArr][yArr][zArr] = null; //front top left
        objectArray[xArr + 1][yArr][zArr] = null; //front top right
        objectArray[xArr][yArr + 1][zArr] = null; //front bottom left
        objectArray[xArr + 1][yArr + 1][zArr] = null; //front bottom right
        objectArray[xArr][yArr][zArr + 1] = null; //back top left
        objectArray[xArr + 1][yArr][zArr + 1] = null; //back top right
        objectArray[xArr][yArr + 1][zArr + 1] = null; //back bottom left
        objectArray[xArr + 1][yArr + 1][zArr + 1] = null; //back bottom right
    };
    return LargeCube;
}(Piece));
//# sourceMappingURL=LargeCube.js.map