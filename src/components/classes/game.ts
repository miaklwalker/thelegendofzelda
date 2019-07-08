import showImage from "../functions/drawImage.js";
/*
Is going to be used for storing non state elements of the game such as diminsions and various screens

*/
export default class Game {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    makeGameScreen(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
    ) {
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
    }
    startScreen(context: CanvasRenderingContext2D) {}
}
