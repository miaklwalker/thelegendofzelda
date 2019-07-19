import Hud from "./hud.js";
/**
 *
 *
 * @export
 * @class pauseScreen
 */
export default class pauseScreen {
    /**
     *Creates an instance of pauseScreen.
     * @memberof pauseScreen
     */
    constructor(inventory, link, camera) {
        this.frame = 0;
        this.blink = true;
        this.hud = new Hud(inventory, link, camera);
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
    show(game) {
        let screen = () => {
            let canvas = document.createElement("canvas");
            canvas.width = game.width;
            canvas.height = game.height;
            let context = canvas.getContext("2d");
            let imageOne = game.images[11].sheet;
            const HUD = imageOne;
            context.drawImage(HUD, ...game.json.hud.inventory); //*inventory
            context.drawImage(HUD, ...game.json.hud.triforce); //*triforce
            context.drawImage(HUD, ...game.json.hud.top); //*hud
            this.hud.minimap(context);
            return canvas;
        };
        return screen;
    }
}
