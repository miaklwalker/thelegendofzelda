import Game from "./game.js";
import loadImage from "../../functions/getImage.js";
import { Vector } from "../math/vector.js";
import Hud from "./hud.js";
import Link from "../actors/link.js";
import inventory from "./inventory.js";
import camera from "./camera.js";

/**
 *
 *
 * @export
 * @class pauseScreen
 */
export default class pauseScreen {
    frame: number;
    blink: boolean;
    hud: Hud;
    /**
     *Creates an instance of pauseScreen.
     * @memberof pauseScreen
     */
    constructor(inventory:inventory,link:Link,camera:camera) {
        this.frame = 0;
        this.blink = true;
        this.hud = new Hud(inventory,link,camera)
    }
    /**
     *
     *
     * @param {CanvasRenderingContext2D} context
     * @memberof pauseScreen
     */

    /**
     *
     *
     * @param {Game} game
     * @returns
     * @memberof pauseScreen
     */
    show(game: Game) {
        let screen = () => {
            let canvas: HTMLCanvasElement = document.createElement("canvas");
            canvas.width = game.width;
            canvas.height = game.height;
            let context = canvas.getContext("2d") as CanvasRenderingContext2D;
            let imageOne = game.images[11].sheet;
            const HUD: HTMLImageElement = imageOne;
            context.drawImage(HUD, ...game.json.hud.inventory); //*inventory
            context.drawImage(HUD, ...game.json.hud.triforce); //*triforce
            context.drawImage(HUD, ...game.json.hud.top); //*hud
            this.hud.minimap(context);
            return canvas;
        };

        return screen;
    }
}
