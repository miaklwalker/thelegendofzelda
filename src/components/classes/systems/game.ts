import Hud from "./hud.js"
import gameState from "./gameState.js";
import Link from "../actors/link.js";
import Overworld from "../overworld.js";
import camera from "./camera.js";

export default class Game {
    width: number;
    height: number;
    gameState: gameState;
    hud: Hud;
    Link: Link;
    json:any;
    overWorld: Overworld;
    camera: camera;

    constructor(width: number, height: number,json:any) {
        this.width = width;
        this.height = height;
        this.gameState = new gameState()
        this.Link = new Link()
        this.hud = new Hud(this.gameState.inventory,this.Link)
        this.json = json
        this.overWorld= new Overworld()
        this.camera = new camera(15,7)
    }
    makeGameScreen(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
    ) {
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
        this.hud.show(context,this)
        this.camera.show(this,context)
    }
    startScreen(context: CanvasRenderingContext2D) {}
}
