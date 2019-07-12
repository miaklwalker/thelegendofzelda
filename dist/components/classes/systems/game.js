import Hud from "./hud.js";
import gameState from "./gameState.js";
import Link from "../actors/link.js";
import Overworld from "../overworld.js";
import camera from "./camera.js";
import pauseScreen from "./pauseScreen.js";
export default class Game {
    constructor(width, height, json) {
        this.width = width;
        this.height = height;
        this.gameState = new gameState();
        this.Link = new Link();
        this.hud = new Hud(this.gameState.inventory, this.Link);
        this.json = json;
        this.overWorld = new Overworld();
        this.camera = new camera(7, 7);
        this.pauseScreen = new pauseScreen();
    }
    makeGameScreen(canvas, context) {
        let pauseMenu = this.pauseScreen.show(this);
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
        let paused = this.gameState.paused ? 0 : -340;
        //this.hud.show(context,this)
        this.camera.show(this, context);
        pauseMenu().then(data => {
            context.drawImage(data, 0, paused, 512, 480);
        });
    }
    startScreen(context) { }
}
