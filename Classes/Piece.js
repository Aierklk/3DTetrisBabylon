/*
 *  Superclass for all game pieces; has movement and rotate functions
 *  TO-DO: Figure out how to import and export
 */
var Piece = /** @class */ (function () {
    //When intance of piece is created, requires name and isActive boolean
    function Piece(name, isActive, offsetW, offsetH, ground) {
        this._rotation = Math.PI / 2; //constant rotation
        this._name = name;
        this._isActive = isActive;
        this._offsetW = offsetW;
        this._offsetH = offsetH;
        this._ground = ground;
        this._shift = 0.5;
        this.pieceData = generateArrayCollisions(width, height);
    }
    Object.defineProperty(Piece.prototype, "name", {
        //accessor for name
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "isActive", {
        //accessor for state
        get: function () {
            return this._isActive;
        },
        enumerable: true,
        configurable: true
    });
    //changeState function will change the block to active or unactive depending on the state when initiailly called
    Piece.prototype.changeState = function () {
        this._isActive = !this._isActive;
        //for debugging and keeping track
        if (this._isActive) {
            console.log("Block is active");
        }
        else {
            console.log("Block is unactive");
        }
    };
    Piece.prototype.movement = function (block) {
        var _this = this;
        if (block.center) {
            var mesh = block.center;
        }
        else {
            var mesh = block.piece;
        }
        var potMeshX = mesh.position.x;
        var potMeshY = mesh.position.y;
        var potMeshZ = mesh.position.z;
        block.placeBlock();
        mergeArrays(gridData, this.pieceData);
        mesh.checkCollisions = true;
        mesh.computeWorldMatrix(true); //update world matrix before every frame; must have for registerBeforeRender
        scene.onKeyboardObservable.add(function (kbInfo) {
            if (_this._isActive) {
                //allows for block to keep moving when hitting side planes
                switch (kbInfo.type) { //keyboard infos
                    case BABYLON.KeyboardEventTypes.KEYDOWN: //if key is down, then...
                        switch (kbInfo.event.key) { //is key = to...
                            case "w":
                            case "W":
                                //code in Piece class that I was referring too
                                potMeshZ += 1;
                                //if spot is free... (based on the potential mesh spot)
                                if (block.meshCollisionCheck(potMeshX, potMeshY, potMeshZ, gridData, "B")) {
                                    block.removeBlock();
                                    mesh.position.z += 1;
                                    block.placeBlock();
                                    mergeArrays(gridData, _this.pieceData);
                                }
                                else {
                                    potMeshZ -= 1;
                                }
                                console.log(gridData);
                                break;
                            case "s":
                            case "S":
                                //code in Piece class that I was referring too
                                potMeshZ -= 1;
                                //if spot is free... (based on the potential mesh spot)
                                if (block.meshCollisionCheck(potMeshX, potMeshY, potMeshZ, gridData, "F")) {
                                    block.removeBlock();
                                    mesh.position.z -= 1;
                                    block.placeBlock();
                                    mergeArrays(gridData, _this.pieceData);
                                }
                                else {
                                    potMeshZ += 1;
                                }
                                console.log(gridData);
                                break;
                            case "a":
                            case "A":
                                //code in Piece class that I was referring too
                                potMeshX -= 1;
                                //if spot is free... (based on the potential mesh spot)
                                if (block.meshCollisionCheck(potMeshX, potMeshY, potMeshZ, gridData, "L")) {
                                    block.removeBlock();
                                    mesh.position.x -= 1;
                                    block.placeBlock();
                                    mergeArrays(gridData, _this.pieceData);
                                }
                                else {
                                    potMeshX += 1;
                                }
                                console.log(gridData);
                                break;
                            case "d":
                            case "D":
                                //code in Piece class that I was referring to
                                potMeshX += 1;
                                //if spot is free... (based on the potential mesh spot)
                                if (block.meshCollisionCheck(potMeshX, potMeshY, potMeshZ, gridData, "R")) {
                                    block.removeBlock();
                                    mesh.position.x += 1;
                                    block.placeBlock();
                                    mergeArrays(gridData, _this.pieceData);
                                }
                                else {
                                    potMeshX -= 1;
                                }
                                console.log(gridData);
                                break;
                            case " ":
                                potMeshY -= 1;
                                //if spot is free... (based on the potential mesh spot)
                                if (block.meshCollisionCheck(potMeshX, potMeshY, potMeshZ, gridData, " ")) {
                                    block.removeBlock();
                                    mesh.position.y -= 1;
                                    block.placeBlock();
                                    mergeArrays(gridData, _this.pieceData);
                                }
                                else {
                                    potMeshY += 1;
                                }
                                console.log(gridData);
                                break;
                            /** Set rotations for each unique piece **/
                            case "r":
                            case "R":
                                block.rotate(mesh);
                                if (block.rotFlipCollisionCheck(potMeshX, potMeshY, potMeshZ, gridData)) {
                                    block.unrotate(mesh);
                                    block.removeBlock();
                                    block.rotate(mesh);
                                    block.placeBlock();
                                    mergeArrays(gridData, _this.pieceData);
                                }
                                else {
                                    block.unrotate(mesh);
                                    block.placeBlock();
                                }
                                console.log(gridData);
                                break;
                            case "f":
                            case "F":
                                //implemented in each subclass
                                block.flip(mesh);
                                if (block.rotFlipCollisionCheck(potMeshX, potMeshY, potMeshZ, gridData)) {
                                    block.unflip(mesh);
                                    block.removeBlock();
                                    block.flip(mesh);
                                    block.placeBlock();
                                    mergeArrays(gridData, _this.pieceData);
                                }
                                else {
                                    block.unflip(mesh);
                                    block.placeBlock();
                                }
                                console.log(gridData);
                                break;
                            case "g":
                            case "G":
                                block.unflip(mesh);
                                if (block.rotFlipCollisionCheck(potMeshX, potMeshY, potMeshZ, gridData)) {
                                    block.flip(mesh);
                                    block.removeBlock();
                                    block.unflip(mesh);
                                    block.placeBlock();
                                    mergeArrays(gridData, _this.pieceData);
                                }
                                else {
                                    block.flip(mesh);
                                }
                                console.log(gridData);
                                break;
                        }
                        break;
                }
            }
        });
    };
    return Piece;
}());
//# sourceMappingURL=Piece.js.map