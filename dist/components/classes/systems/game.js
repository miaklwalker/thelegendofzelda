import Hud from "./hud.js";
import gameState from "./gameState.js";
import Link from "../actors/link.js";
import camera from "./camera.js";
import pauseScreen from "./pauseScreen.js";
import loadImage from "../../functions/getImage.js";
/**
 *
 *
 * @export
 * @class Game
 * @param width The width of the game screen
 * @param height The hieght of the game screen
 * @param json A Json containing all of the games files
 *
 */
export default class Game {
    /**
     *Creates an instance of Game.
     * @param {number} width
     * @param {number} height
     * @param {*} json
     * @memberof Game
     */
    constructor(width, height, json) {
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
    /**
     *
     *
     * @param {CanvasRenderingContext2D} context
     * @memberof Game
     */
    makeGameScreen(context) {
        let pauseMenu = this.pauseScreen.show(this);
        let paused = this.gameState.paused ? 0 : -360;
        this.camera.show(this, context);
        pauseMenu().then(data => {
            context.drawImage(data, 0, paused, 512, 480);
        });
    }
    rungame() { }
    /**
     *
     *
     * @memberof Game
     */
    loadFiles() {
        let images = Object.values(this.json.urls).map(url => loadImage(url));
        Promise.all(images).then(response => {
            this.images.push(response);
        });
    }
}
