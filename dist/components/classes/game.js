/*
Is going to be used for storing non state elements of the game such as diminsions and various screens

*/
export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    makeGameScreen(canvas, context) {
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
    }
    startScreen(context) { }
}
//# sourceMappingURL=game.js.map