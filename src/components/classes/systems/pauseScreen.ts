import Game from "./game.js";
import Hud from "./hud.js";
import inventory from "./inventory.js";
import camera from "./camera.js";
import { memoize } from "../../objects/decorators.js";

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
    constructor(game:Game) {
        this.frame = 0;
        this.blink = true;
        this.hud = new Hud(game)
    }
    /**
     * @param {Game} game
     * @returns
     * @memberof pauseScreen
     */
    @memoize
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
