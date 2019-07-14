import Hud from "./hud.js";
import gameState from "./gameState.js";
import Link from "../actors/link.js";
import camera from "./camera.js";
import pauseScreen from "./pauseScreen.js";
import loadImage from "../../functions/getImage.js";
import RootObject from "../../objects/interfaces.js";

export default class Game {
    width: number;
    height: number;
    gameState: gameState;
    hud: Hud;
    Link: Link;
    json: RootObject;
    camera: camera;
    pauseScreen: pauseScreen;
    images: any[];
    constructor(width: number, height: number, json: any) {
        this.width = width;
        this.height = height;
        this.gameState = new gameState();
        this.Link = new Link();
        this.hud = new Hud(this);
        this.json = json;
        this.camera = new camera();
        this.pauseScreen = new pauseScreen();
        this.images = [];
    }
    makeGameScreen(context: CanvasRenderingContext2D) {
        let pauseMenu = this.pauseScreen.show(this);
        let paused = this.gameState.paused ? 0 : -360;
        this.camera.show(this, context);
        pauseMenu().then(data => {
            context.drawImage(data, 0, paused, 512, 480);
        });
    }
    rungame() {}
    loadFiles() {
        let images = Object.values(this.json.urls).map(url => loadImage(url));
        Promise.all(images).then(response => {
            this.images.push(response);
        });
    }
}
