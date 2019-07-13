import Hud from "./hud.js";
import gameState from "./gameState.js";
import Link from "../actors/link.js";
import Overworld from "../overworld.js";
import camera from "./camera.js";
import pauseScreen from "./pauseScreen.js";

export default class Game {
    width: number;
    height: number;
    gameState: gameState;
    hud: Hud;
    Link: Link;
    json: any;
    overWorld: Overworld;
    camera: camera;
    pauseScreen: pauseScreen;
    constructor(width: number, height: number, json: any) {
        this.width = width;
        this.height = height;
        this.gameState = new gameState();
        this.Link = new Link();
        this.hud = new Hud(this);
        this.json = json;
        this.overWorld = new Overworld();
        this.camera = new camera(7, 7);
        this.pauseScreen = new pauseScreen();
    }
    makeGameScreen(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
    ) {
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
        let pauseMenu = this.pauseScreen.show(this);
        let paused = this.gameState.paused ? 0 : -360;
        this.camera.show(this, context);
        pauseMenu().then(data => {
            context.drawImage(data, 0, paused, 512, 480);
        });
    }
}
