/**
 * Small L-Block, 2 x 2
 * Drawn with top right corner
 */

class MiniL extends Block {
    private _cube2: BABYLON.InstancedMesh;
    private _cube3: BABYLON.InstancedMesh;

    constructor() {
        super(3);
        this.type = "mini l";
        this.create();
        this.setCubes();
    }

    private create(): void {
        this.parentCube = this.createCube(4.5, -1); //left-most, top

        var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3(1, 0.2, 0.3);
        mat.emissiveColor = new BABYLON.Color3(1, 0.2, 0.3); //light red
        this.parentCube.material = mat;
        this.parentCube.material.backFaceCulling = false;

        this._cube2 = this.becomeChild(this._cube2);
        this._cube2.position = new BABYLON.Vector3(0, -1, 0); //left-most, bottom

        this._cube3 = this.becomeChild(this._cube2);
        this._cube3.position = new BABYLON.Vector3(1, 0, 0); //right, top

    }

    public getPositions(): BABYLON.Vector3[] {
        this.setPositions();
        return this.positions;
    }

    private setPositions(): void {
        this.uncouple();
        this.positions = [this.parentCube.position, this._cube2.position, this._cube3.position];
    }

    private setCubes(): void {
        this.cubes = [this._cube2, this._cube3];
    }
}