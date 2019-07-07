import showImage from "../functions/drawImage.js"

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
        canvas.width = 240;
        canvas.height = 240;
        document.body.appendChild(canvas);
    }
    startScreen(context:CanvasRenderingContext2D){
        showImage(context,"../images/littlelink.png",[0,0,240,240])
    }
}
