var GameOver = /** @class */ (function () {
    function GameOver(scene, score) {
        this._advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
        this.active = true;
        this._font = "Agency FB";
        this._scene = scene;
        this._start = new BABYLON.GUI.TextBlock("start");
        this._start.text = "C L I C K    A N Y W H E R E    T O    P L A Y    A G A I N";
        this._start.color = "white";
        this._start.fontFamily = this._font;
        this._start.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this._start.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this._start.fontSize = 30;
        this._advancedTexture.addControl(this._start);
        this._titleBack = new BABYLON.GUI.TextBlock("titleFront");
        this._titleBack.text = "GAME OVER";
        this._titleBack.color = "purple";
        this._titleBack.fontSize = 275;
        this._titleBack.fontFamily = this._font;
        this._titleBack.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this._titleBack.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this._titleBack.top = -240;
        this._titleBack.left = -10;
        this._advancedTexture.addControl(this._titleBack);
        this._titleFront = new BABYLON.GUI.TextBlock("titleFront");
        this._titleFront.text = "GAME OVER";
        this._titleFront.color = "white";
        this._titleFront.fontSize = 275;
        this._titleFront.fontFamily = this._font;
        this._titleFront.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this._titleFront.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this._titleFront.top = -250;
        this._titleBack.left = 10;
        this._advancedTexture.addControl(this._titleFront);
        // this._authors = new BABYLON.GUI.TextBlock("authors");
        //     this._authors.text = "b  y     A  n  n  a     a  n  d     R  J";
        //     this._authors.color = "white";
        //     this._authors.fontFamily = this._font;
        //     this._authors.fontSize = 50;
        //     this._authors.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        //     this._authors.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        //     this._authors.top = -100;
        //     this._advancedTexture.addControl(this._authors);
        this._line = new BABYLON.GUI.Line();
        this._line.color = "white";
        this._line.lineWidth = 20;
        this._line.x1 = 0;
        this._line.y1 = 700;
        this._line.x2 = 2000;
        this._line.y2 = 700;
        this._line.alpha = 0.2;
        this._advancedTexture.addControl(this._line);
        // this._howToPlay = new BABYLON.GUI.TextBlock("howToPlay");
        //     this._howToPlay.text = "HOW TO PLAY:"
        //     this._howToPlay.fontFamily = this._font;
        //     this._howToPlay.fontSize = 30;
        //     this._howToPlay.color = "white";
        //     this._howToPlay.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        //     this._howToPlay.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        //     this._howToPlay.left = 200;
        //     this._howToPlay.top = -370;
        //     this._advancedTexture.addControl(this._howToPlay);
        this._score = new BABYLON.GUI.TextBlock("score");
        this._score.text = "Score : " + score;
        this._score.fontFamily = this._font;
        this._score.color = "white";
        this._score.fontSize = 50;
        this._score.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this._score.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this._score.left = 0;
        this._score.top = 200;
        this._advancedTexture.addControl(this._score);
    }
    Object.defineProperty(GameOver.prototype, "isActive", {
        get: function () {
            return this.active;
        },
        enumerable: true,
        configurable: true
    });
    GameOver.prototype.hide = function () {
        if (!this.active) { //if no longer active...
            this._titleFront.dispose();
            this._titleBack.dispose();
            //this._authors.dispose();
            //this._howToPlay.dispose();
            this._start.dispose();
            // this._instructions.dispose();
            this._line.dispose();
            this._score.dispose();
        }
    };
    return GameOver;
}());
//# sourceMappingURL=GameOver.js.map