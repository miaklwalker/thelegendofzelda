import Hud from "./hud.js";
import gameState from "./gameState.js";
import Link from "../actors/link.js";
export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.gameState = new gameState();
        this.Link = new Link();
        this.hud = new Hud(this.gameState.inventory, this.Link);
    }
    makeGameScreen(canvas, context) {
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
        this.hud.show(context, this);
        this.hud.showHearts(context);
    }
    startScreen(context) { }
}
