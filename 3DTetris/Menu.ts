class Menu {
    private _advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
    private _startButton : BABYLON.GUI.Button;
    private _titleFront : BABYLON.GUI.TextBlock;
    private _titleBack : BABYLON.GUI.TextBlock;
    private _authors : BABYLON.GUI.TextBlock;
    private _howToPlay : BABYLON.GUI.TextBlock;
    private _line : BABYLON.GUI.Line;
    private _font : string;

    constructor() { //menu, ui
        this._font = "Agency FB";

        this._startButton = BABYLON.GUI.Button.CreateSimpleButton("startButton", "START");
            this._startButton.textBlock.color = "white";
            this._startButton.textBlock.fontFamily = this._font;
            this._startButton.textBlock.fontSize = 50;

            this._startButton.height = 0.1;
            this._startButton.width = 0.1;
            this._startButton.background = "black";
            this._startButton.top = 50;

            this._advancedTexture.addControl(this._startButton);
        
        this._titleBack = new BABYLON.GUI.TextBlock("titleFront");
            this._titleBack.text = "3D Tetris";
            this._titleBack.color = "black";
            this._titleBack.fontSize = 275;
            this._titleBack.fontFamily = this._font;
            this._titleBack.top = -240;
            this._titleBack.left = -10;

            this._advancedTexture.addControl(this._titleBack);
            

        this._titleFront = new BABYLON.GUI.TextBlock("titleFront");
            this._titleFront.text = "3D Tetris";
            this._titleFront.color = "white";
            this._titleFront.fontSize = 275;
            this._titleFront.fontFamily = this._font;
            this._titleFront.top = -250;
            this._titleBack.left = 10;

            this._advancedTexture.addControl(this._titleFront);

        this._authors = new BABYLON.GUI.TextBlock("authors");
            this._authors.text = "b  y     A  n  n  a     a  n  d     R  J";
            this._authors.color = "white";
            this._authors.fontFamily = this._font;
            this._authors.fontSize = 50;
            this._authors.top = -100;

            this._advancedTexture.addControl(this._authors);

        this._line = new BABYLON.GUI.Line();
            this._line.color = "white";
            this._line.lineWidth = 20;
            this._line.x1 = 0;
            this._line.y1 = 700;
            this._line.y2 = 700;
            this._line.x2 = 2000;
            this._line.alpha = 0.2;

            this._advancedTexture.addControl(this._line);

        this._howToPlay = new BABYLON.GUI.TextBlock("howToPlay");
            this._howToPlay.text = "HOW TO PLAY:"
            this._howToPlay.fontFamily = this._font;
            this._howToPlay.fontSize = 30;
            this._howToPlay.color = "white";
            this._howToPlay.left = -600;
            this._howToPlay.top = 155;

            this._advancedTexture.addControl(this._howToPlay);
    }
}