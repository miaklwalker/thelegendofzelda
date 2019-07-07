/*
Is going to be used for storing non state elements of the game such as diminsions and various screens

*/
export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    makeGameScreen(canvas, context) {
        canvas.width = 480;
        canvas.height = 480;
        document.body.appendChild(canvas);
    }
    startScreen(context) {
    }
}
