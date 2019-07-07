import showImage from "../functions/drawImage.js";
export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    makeGameScreen(canvas, context) {
        canvas.width = 240;
        canvas.height = 240;
        document.body.appendChild(canvas);
    }
    startScreen(context) {
        showImage(context, "../images/littlelink.png", [0, 0, 240, 240]);
    }
}
