/*
 *  Superclass for all game pieces; has movement and rotate functions
 *  TO-DO: Figure out how to import and export
 */
var Piece = /** @class */ (function () {
    //When intance of piece is created, requires name and isActive boolean
    function Piece(name, isActive, offsetW, offsetH, ground) {
        this._shift = 0;
        this.blockRotationZ = 0;
        this.blockRotationX = 0;
        this.blockRotationY = 0;
        this._rotation = Math.PI / 2; //constant rotation
        this._name = name;
        this._isActive = isActive;
        this._offsetW = offsetW;
        this._offsetH = offsetH;
        this._ground = ground;
        if (this._offsetW || this._offsetH) {
            this._shift = 0.5;
        }
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
        var movement = 1;
        var collided = false;
        var colpt;
        var mesh = block.piece;
        mesh.checkCollisions = true;
        mesh.computeWorldMatrix(true); //update world matrix before every frame; must have for registerBeforeRender
        /***** Anna's Code for Collisions with Ground and Sides of Gameboard *****/
        scene.registerAfterRender(function () {
            if (mesh.intersectsMesh(_this._ground, true)) { //box collision
                mesh.emissiveColor = new BABYLON.Color3(0.5, 0, 0);
                //get position block collides at:
                if (!collided) {
                    colpt = mesh.position;
                    collided = true;
                }
            }
            else {
                mesh.emissiveColor = new BABYLON.Color3(1, 1, 1);
            }
        });
        scene.onKeyboardObservable.add(function (kbInfo) {
            if (collided) {
                colpt = mesh.position;
            }
            else {
                switch (kbInfo.type) { //keyboard info
                    case BABYLON.KeyboardEventTypes.KEYDOWN: //if key is down
                        switch (kbInfo.event.key) { //is key = to...
                            case "w":
                            case "W":
                                // mesh.position.z += movement;
                                mesh.moveWithCollisions(new BABYLON.Vector3(0, 0, 1)); //resets moveWithCollisions
                                break;
                            case "s":
                            case "S":
                                //mesh.position.z -= movement;
                                mesh.moveWithCollisions(new BABYLON.Vector3(0, 0, -1));
                                break;
                            case "a":
                            case "A":
                                // mesh.position.x -= movement;
                                mesh.moveWithCollisions(new BABYLON.Vector3(-1, 0, 0));
                                break;
                            case "d":
                            case "D":
                                // mesh.position.x += movement;
                                mesh.moveWithCollisions(new BABYLON.Vector3(1, 0, 0));
                                break;
                            case " ":
                                mesh.position.y -= movement;
                                break;
                            /** Rotations are about world axes as opposed to local axes; will always rotate the same way **/
                            //TO-DO: Rotations of odd grid make it so that some blocks aren't locked to grid anymore; see TO-DO in specific classes
                            case "r":
                            case "R":
                                mesh.rotate(BABYLON.Axis.Z, _this._rotation, BABYLON.Space.WORLD);
                                block.rotateMoveZ();
                                break;
                            case "e":
                            case "E":
                                mesh.rotate(BABYLON.Axis.X, _this._rotation, BABYLON.Space.WORLD);
                                //block.rotateMoveX();
                                break;
                            case "y":
                            case "Y":
                                mesh.rotate(BABYLON.Axis.Y, _this._rotation, BABYLON.Space.WORLD);
                                //block.rotateMoveY();
                                break;
                        } //switch
                        break; //case  
                } //switch          
            } //if-else
        }); //scene
    }; //movement()
    return Piece;
}()); //class
//# sourceMappingURL=Piece.js.map