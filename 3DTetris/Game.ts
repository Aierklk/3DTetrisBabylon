/*import {GameBoard} from './GameBoard.js';*/

class Game {
    public gameBoard: GameBoard;
    public block: Block; //stores current active block
    private _dummy: Block;
    public collided: boolean;
    public colpt: BABYLON.Vector3;
    private _landed: BABYLON.Mesh[]; //any[] //landed (inactive) blocks stored as cubes (uncoupled);  active -> collided -> space = true
    //use for landed cubes' positions
    public score: number; //whenever a layer cleared = 49 pts (7x7)
    private _rotation: number;
    public fallingInterval;
    public scene;

    constructor(size: number, scene: BABYLON.Scene) {
        this.scene = scene;
        this.gameBoard = new GameBoard(size); //7 or 5
        this.score = 0;
        this.collided = false;
        this.enableControls();
        this._landed = new Array(); //push landed elements/blocks
        this._rotation = Math.PI / 2;

        //loop for drawing block...
        this.drawBlock();
    
        this.scene.registerAfterRender(() => {
            if (this.collided === true) { //this.gameBoard.inGrid(this.block.getPositions()) && 
                this.block.recouple();
                console.log("collided");
                clearInterval(this.fallingInterval); //compute world matrix?
                this.collided = true; //to disable controls
                //isactive = false;
                // this._dummy.parentCube.dispose();
                this.setLanded();
                this.checkFullLayer(); //IF landed.length > 0
                if (!this.gameOver()) {
                    this.collided = false;
                    this.drawBlock();
                }
            } 
        });
    }

    public drawBlock() { //loop - draw another block based on time interval/when current block not active
        //randomize block - array of options (string or number); spawn a random block: switch case
        //can block be drawn without hitting anything? - start height outside of grid (!ingrid), only update spaces if inside grid/active
        //if inactive - -3 <= pos.x <= 3 and -3 <= pos.z <= 3
        // this.collided = false;

        var random = Math.floor(Math.random() * 16); //generates numbers from 0-15
        // random = 2;
        //change randomizer later

        //limitation: can only move block once fully in grid
        switch(random) {
            case 0:
            case 15:
                this.block = new Cube();
                console.log("drew cube");
                break;
            case 1:
            case 14:
                this.block = new ShortTower();
                console.log("drew st");
                // this._dummy = new ShortTower();
                break;
            case 2:
            case 13:
                this.block = new BigTower(); //acts as if already collided when spawned?
                console.log("drew big tower");
                // this._dummy = new BigTower();
                break;
            case 3:
            case 12:
                this.block = new MiniL();
                console.log("drew ml");
                // this._dummy = new MiniL();
                break;
            case 4:
            case 11:
                this.block = new BigL();
                console.log("drew bl");
                // this._dummy = new BigLb();
                break;
            case 5:
            case 10:
                this.block = new BigCube();
                console.log("drew bc");
                break;
            case 6:
            case 9:
                this.block = new TBlock();
                console.log("drew t");
                // this._dummy = new TBlock();
                break;
            case 7:
            case 8:
                this.block = new ZBlock();
                console.log("drew z");
                // this._dummy = new ZBlockb();
                break;
        }
        
        // this._dummy.parentCube.setParent(this.block.parentCube); //position??
        // this._dummy.parentCube.position = new BABYLON.Vector3(0, 0, 0);
        // this._dummy.parentCube.visibility = 0;
        
        this.checkCollision();
       
        this.fallingInterval = setInterval(() => { 
            //!this.collided
            if (this.gameBoard.inGrid(this.block.getPositions()) === false ) { //for when block first spawned
                this.collided = false;
                this.block.recouple();
                this.block.position.y -= 1;
            }
            else if (this.gameBoard.inGrid(this.block.getPositions()) && this.gameBoard.canMove(this.block.getPositions(), "down") === false) {
                // this.block.recouple(); //no need to recouple
                this.collided = true;
            } 
            else if (this.gameBoard.inGrid(this.block.getPositions()) && this.checkCollision() === false && this.gameBoard.canMove(this.block.getPositions(), "down")) {
                this.block.recouple();
                this.block.position.y -= 1;
                this.gameBoard.updateSpaces(this.block.getPositions(), true, false);
                this.block.recouple();
            }
            console.log(this.gameBoard.spaces);
        }, 1250); //1500 

    }
    
    //draw drop preview
    // private getNextBlock() { //for preview of next block
    //     //randomize block here?
    // }

    // private canRotate(axis: string): boolean {
    //     //create dummy obj/instance of same block (has same properties?) before actually moving
    //     //compare dummy's positions (its array) with positions of gameboard
    //     //ingrid, isoccupied
    //     if (this.block.type === "big cube" || this.block.type === "cube") {
    //         return true;
    //     }
    //     var occupied: boolean;
    //     var inBounds: boolean;

    //     switch(axis) {
    //         case "x":
    //             this._dummy.rotate("x", this._rotation); //rotating dummy doesn't affect parent
    //             console.log("x", this._dummy.parentCube.visibility);
    //             occupied = this.gameBoard.isOccupied(this.block.getPositions(), this._dummy.getPositions()); 
    //             inBounds = this.gameBoard.inGrid(this._dummy.getPositions());
    //             this.block.recouple();
    //             this._dummy.recouple();
                
    //             this._dummy.rotate("x", -this._rotation); //reset rotation of dummy
    //             this._dummy.parentCube.visibility = 0;
    //             break;
    //         case "y":
    //             this._dummy.rotate("y", this._rotation);
    //             console.log("y", this._dummy.parentCube.visibility);
    //             occupied = this.gameBoard.isOccupied(this.block.getPositions(), this._dummy.getPositions());
    //             inBounds = this.gameBoard.inGrid(this._dummy.getPositions());
    //             this.block.recouple();
    //             this._dummy.recouple();
                
    //             this._dummy.rotate("y", -this._rotation);
    //             this._dummy.parentCube.visibility = 0;
    //             break;
    //         case "z":
    //             this._dummy.rotate("z", this._rotation);
    //             console.log("z", this._dummy.parentCube.visibility);
    //             occupied = this.gameBoard.isOccupied(this.block.getPositions(), this._dummy.getPositions());
    //             inBounds = this.gameBoard.inGrid(this._dummy.getPositions());
    //             this.block.recouple();
    //             this._dummy.recouple();
                
    //             this._dummy.rotate("x", -this._rotation);
    //             this._dummy.parentCube.visibility = 0;
    //             break;
    //     }   

    //     if (occupied === false && inBounds === true) { //occupied is false - can rotate
    //         return true;
    //     }
    //     return false;
    // }

    private checkCollision(): boolean { //if block is landed/collided ON GROUND
        //either y = 11 (ground lvl)(height -1), or block right ontop of another mesh (y+1 -> space = true)
        
        var groundlvl = this.gameBoard.groundlvl;
        var groundtrack = 0;

        for (var i = 0; i < this.block.getPositions().length; i++) {
            if ( this.block.getPositions()[i].y === groundlvl) {
                groundtrack++;
            }
        }
        this.block.recouple();

        if (groundtrack > 0) {
            this.collided = true;
            console.log("true");
            return true;
        }
        return false;
    }

    private setLanded(): void { //store cubes into landed
        this.block.uncouple();
        // var arr = this.block.cubes;
        if (this.block.type === "cube") {
            console.log("a cube");
            this._landed.push(this.block.parentCube);
        }
        else if (this.block.type !== "cube") {
            for (var i = 0; i < this.block.cubes.length; i++) {
                this._landed.push(this.block.cubes[i]);
            }
            this._landed.push(this.block.parentCube);
        }
        // this._landed.push(this.block.parentCube);

        //store landed block's positions (for updateSpaces)
        console.log(this._landed);
        var arr = new Array();
        for (var el = 0; el < this._landed.length; el++) {
            arr.push(this._landed[el].position); 
        }
        console.log(arr);
        this.gameBoard.updateSpaces(arr, false, true);
    }

    //not just for bottom layer, but for any layer
    private checkFullLayer(): void { //use observable?

        var height = this.gameBoard.height;
        var size = this.gameBoard.size;

        var fullLayer: boolean;
        var layerNums: number[] = new Array(); //which layers are cleared? .length = 0 if no full layers
        var layerheight = null;

        //single layer - same y coordinate
        for (var y = 0; y < height; y++) { //for each layer of y height...
            fullLayer = true;
            for (var x = 0; x < size; x++) {
                for (var z = 0; z < size; z++) {
                    if (this.gameBoard.spaces[x][y][z] === false) { //if element in layer in false
                        fullLayer = false
                        //fullLayer stays true if element in layer never = false
                    }
                    else {
                        layerheight = this.gameBoard.positions[x][y][z].y;
                        console.log(layerheight);
                    }
                }
            }
            if (fullLayer) { //clear everytime you encounter full layer
                console.log("full layer");
                this.clearLayer(y, layerheight, size);
                if (y !== 0) {
                    layerNums.push(y); //stores which layers were cleared, used to collapse layer
                }
                this.score += size * size;
                fullLayer = false;
            } //when block is at y = 0, game over?
        }
        
        if (layerNums.length > 0) { //collpase only if full layers exist and were cleared - when layerNums has >0 elements
            this.collapseLayers(layerNums, size, height);
        }
        //if layerNums has no elements, no layers were full and cleared, so no need to collapse layers - base case
    }

    //in spaces array and remove meshes -> block.dispose() -> landed array
    private clearLayer(layer: number, layerheight: number, size: number): void { //remove a full layer/plane of blocks
        //clear layer in spaces array - in horizontal plane of same y
        for (var x = 0; x < size; x++) {
            for (var z = 0; z < size; z++) {
                this.gameBoard.spaces[x][layer][z] = false;
            }
        }
        console.log(this.gameBoard.spaces);
        
        //to remove blocks:
        //iterate through blocks on this layer, make 1st block a parent of subsequent blocks, delete parent block

        // landed - array of blocks/meshes, if block.position.y = layer -> delete
        for (var i = 0; i < this._landed.length; i++) {
            var position = this._landed[i].position;
            if (position.y === layerheight) {
                //delete mesh in 3d world, but doesn't delete element in landed array
                this._landed[i].dispose(); //deleting each block separately
                this._landed[i] = null;
                console.log("cleared block");
            }
        }
        console.log(this._landed);
        // var parent: BABYLON.Mesh;
        // var first = true;

        // for (var i = 0; i < this._landed.length; i++) { 
        //     //cube that makes up block at y lvl/height should be cleared 
        //     if (this._landed[i].position.y === layerheight && first) {
        //         parent = this._landed[i]; //makes 1st block the parent
        //         first = false;
        //     }
        //     else if (this._landed[i].position.y === layerheight) {
        //         this._landed[i].parent = parent;
        //     }

        // }
        // // this.scene.blockfreeActiveMeshesAndRenderingGroups = true;

        // parent.dispose(); //removes cube parts of block (as stored in landed arr - blocks uncoupled onced landed- dont recouple)
        // parent = null;

        // this.scene.blockfreeActiveMeshesAndRenderingGroups = false;

        for (var j = this._landed.length - 1; j >= 0; j--) { //delete landed elements that have been disposed
            if (this._landed[j] === null) {
                this._landed.splice(j, 1); //remove cube mesh fr landed array
            }
        }
        console.log(this._landed);
    }

    private collapseLayers(layerNums: number[], size: number, height: number): void { //layers (above) will all move down 1 after full layer disappears
        
        //move down each element in landed array at specific y layer
        //cases: double layers cleared; if layerNums not right after another but multiple - start with lowest layer (y) - last element

        //cleared layer(s) 1st -> shift down layers above cleared layers: collapse function
        //use landed array -> change positions.y of any block above y to positions.y-1, IF space = false
            //actually pos.y shifted down as far as it can if it none of it collides with other blocks
            //move blocks 1st and THEN update pos
        
        //move each cube down 1 at a time and update spaces each layer at a time: start from bottom
        //cascade method (implement later): same type of block shifts down together, cube remembers which part of block it was
        //this method: each cube in landed goes down if space below empty/false, does this until space below is true

        var landedPos = new Array();
        for (var el = 0; el < this._landed.length; el++) {
            landedPos.push(this._landed[el].position); 
        }

        //start 1 from the lowest layer cleared:
        var y = layerNums[layerNums.length - 1] - 1; //ground lvl: y = 11 (height-1); assuming layer isn't y = 0 (top)
        var layer = y + 1;

        for (y; y >= 0; y--) {
            for (var x = 0; x < size; x++) {
                for (var z = 0; z < size; z++) {

                    for (var i = 0; i < landedPos.length; i++) {
                        //see if position in landed same as in position arr in gameboard - should only find 1 match at this xyz
                        if (this.gameBoard.compare(landedPos[i], x, y, z) === true) {  //if yes, mesh at that pos to be shifted down
                            console.log(landedPos);
                            //each block above layer goes down 1 y until reach lowest y   
                            //and shift blocks down if space below = true  
                            layer = y + 1;          
                            while (layer < height && this.gameBoard.spaces[x][layer][z] === false) {
                                // this._landed[i].position.y -= 1; //shift down cube in 3d world
                                landedPos[i].y--;
                                layer++;
                            }

                            // this.gameBoard.updateSpaces(landedPos, false, true);
                        }
                    }

                    //or use can move method
                }
            }
            this.gameBoard.updateSpaces(landedPos, false, true); //update after entire y plane of cubes shifted down
        }
        //use can move method, pass in one el in landed as one el array

        this.checkFullLayer(); //once collapsed, check for new full layers - runtime error?
        //check layer again once you collapsed - break out of this once checkLayer -> false
    }

    //keyboard controls for active block
    private enableControls() {
        //everytime block moves, this._gameBoard.updateSpaces()
        //is there an ActiveBlock? - check layer after a block locks into place (no active blocks) - if (collided)
        //gameBoard.checkFullLayer() -> .clearLayer() -> this.collapseLayers()
        //if collided (block's isactive = false - block only moves when isactive is true), store block in landed (position) - 3d array

        //motions
        this.scene.onKeyboardObservable.add((kbInfo) => { 
            if (this.gameBoard.inGrid(this.block.getPositions()))  {
                this.block.recouple();
                this.checkCollision(); 
            }
            if (!this.collided)  { //&& this.gameBoard.inGrid(this.block.getPositions()) - when block 1st drawn, outside of grid, cant use keyboard
                switch (kbInfo.type) {
                    case BABYLON.KeyboardEventTypes.KEYDOWN:
                        switch (kbInfo.event.key) {
                            case "w": //forward
                                if (this.gameBoard.inGrid(this.block.getPositions()) && this.gameBoard.canMove(this.block.getPositions(), "forward")) {
                                    this.block.recouple(); //must call recouple after you call getPositions
                                    this.block.position.z += 1;
                                }
                                break;

                            case "s": //backward
                                if (this.gameBoard.inGrid(this.block.getPositions()) && this.gameBoard.canMove(this.block.getPositions(), "back")) {
                                    this.block.recouple();
                                    this.block.position.z -= 1;
                                }
                                break;

                            case "a": //left
                                if (this.gameBoard.inGrid(this.block.getPositions()) && this.gameBoard.canMove(this.block.getPositions(), "left")) {
                                    this.block.recouple();
                                    this.block.position.x -= 1;
                                }
                                break;

                            case "d": //right
                                if (this.gameBoard.inGrid(this.block.getPositions()) && this.gameBoard.canMove(this.block.getPositions(), "right")) {
                                    this.block.recouple();
                                    this.block.position.x += 1;
                                }
                                break;

                            case " ": //down
                                if (this.gameBoard.inGrid(this.block.getPositions()) && this.gameBoard.canMove(this.block.getPositions(), "down")) {
                                    this.block.recouple();
                                    this.block.position.y -= 1;
                                }
                                else if (this.gameBoard.inGrid(this.block.getPositions()) && this.gameBoard.canMove(this.block.getPositions(), "down") === false) {
                                    this.collided = true;
                                } 
                                break;

                            case "z": //rotations screw up inGrid
                                //rotating, if block would be in a position not found in positions array - can't move (get preview)
                                // if (this.canRotate("x")) {
                                    this.block.rotate("x", this._rotation); //rotate child 1st to se if it intersects?
                                    this.block.recouple();
                                // }
                                break;

                            case "x":
                                // if (this.canRotate("y")) {
                                    this.block.rotate("y", this._rotation);
                                // }
                                break;

                            case "c":
                                // if (this.canRotate("z")) {
                                    this.block.rotate("z", this._rotation); 
                                // }
                                break;
                        }
                        this.gameBoard.updateSpaces(this.block.getPositions(), true, false);
                        this.block.recouple();
                        console.log(this.gameBoard.spaces); //affected by rotations?
                        // this.checkCollision();
                    break;
                }
            }     
        });
    }

    public gameOver(): boolean { 
        //isgameboardfull  - if space at y = 0 is full (after active block landed, before new block drawn)
        //at least one block pos at y = 0 and another block directly under it
        //and !ingrid()
        //if collided and !ingrid -> game over
        //remove keyboard observable?
        return false; //will make game loop forever
    } 
}