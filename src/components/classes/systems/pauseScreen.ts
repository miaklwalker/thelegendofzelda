import Game from "./game.js";
import Hud from "./hud.js";
import inventory from "./inventory.js";
import camera from "./camera.js";
import { memoize } from "../../objects/decorators.js";
import Overworld from "../../overworld.js";

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
            let middle = game.gameState.currentMap instanceof Overworld ? 'Triforce':'dungeonMap'
            const HUD: HTMLImageElement = imageOne;
            game.images[11].renderSprite(context,'Inventory',[0,0,512,166])
            game.images[11].renderSprite(context,middle,[0,166,512,195])
            game.images[11].renderSprite(context,'Hud',[0,360,512,120])
            this.hud.minimap(context);
            return canvas;
        };
        return screen;
    }
}
