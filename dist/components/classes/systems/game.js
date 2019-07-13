import Hud from "./hud.js";
import gameState from "./gameState.js";
import Link from "../actors/link.js";
import Overworld from "../overworld.js";
import camera from "./camera.js";
import pauseScreen from "./pauseScreen.js";
import loadImage from "../../functions/getImage.js";
export default class Game {
    constructor(width, height, json) {
        this.width = width;
        this.height = height;
        this.gameState = new gameState();
        this.Link = new Link();
        this.hud = new Hud(this);
        this.json = json;
        this.overWorld = new Overworld();
        this.camera = new camera(7, 7);
        this.pauseScreen = new pauseScreen();
        this.images = [];
    }
    makeGameScreen(canvas, context) {
        let pauseMenu = this.pauseScreen.show(this);
        let paused = this.gameState.paused ? 0 : -360;
        this.camera.show(this, context);
        pauseMenu().then(data => {
            context.drawImage(data, 0, paused, 512, 480);
        });
    }
    rungame() { }
    loadFiles() {
        let images = Object.values(this.json.urls).map(url => loadImage(url));
        console.log(images);
        Promise.all(images).then(response => { this.images.push(response); }).finally(() => console.log(this.images));
    }
}
