/*
 * Big L-Block, 2 x 3
 * Drawn on horizontal major axis, cube up
 */

class BigL extends Block { 
    private _cube2: BABYLON.InstancedMesh;
    private _cube3: BABYLON.InstancedMesh;
    private _cube4: BABYLON.InstancedMesh;

    constructor() {
        super(4);
        this.type = "big l";
        this.create();
        this.setCubes();
    }

    private create(): void {
        this.parentCube = this.createCube(4.5, 0); //middle, bottom cube

        var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.4, 0.28, 1);
        mat.emissiveColor = new BABYLON.Color3(1, 0.28, 1); //pink
        this.parentCube.material = mat;
        this.parentCube.material.backFaceCulling = false;

        this._cube2 = this.becomeChild(this._cube2);
        this._cube2.position = new BABYLON.Vector3(-1, 0, 0); //left, bottom
        
        this._cube3 = this.becomeChild(this._cube3);
        this._cube3.position = new BABYLON.Vector3(-1, 1, 0); //left, top

        this._cube4 = this.becomeChild(this._cube4);
        this._cube4.position = new BABYLON.Vector3(1, 0, 0); //right, bottom
    }

    public getPositions(): BABYLON.Vector3[] {
        this.setPositions();
        return this.positions;
    }

    private setPositions(): void {
        this.uncouple();
        this.positions = [this.parentCube.position, this._cube2.position, this._cube3.position, this._cube4.position];
    }

    private setCubes(): void {
        this.cubes = [this._cube2, this._cube3, this._cube4];
    }
}