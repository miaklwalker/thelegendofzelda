import Game from "./game";
import loadImage from "../../functions/getImage.js";
import { Vector } from "../math/vector.js";

/**
 *
 *
 * @export
 * @class pauseScreen
 */
export default class pauseScreen {
    position: Vector;
    frame: number;
    blink: boolean;
    /**
     *Creates an instance of pauseScreen.
     * @memberof pauseScreen
     */
    constructor() {
        this.position = new Vector();
        this.frame = 0;
        this.blink = true;
    }
    /**
     *
     *
     * @param {CanvasRenderingContext2D} context
     * @memberof pauseScreen
     */
    minimap(context: CanvasRenderingContext2D) {
        this.frame++;
        if (this.frame % 30 === 0) {
            this.blink = !this.blink;
        }
        let minimapX = 130;
        let minimapY = 77;
        let width = 14;
        let height = 8;
        let offsetX = 31;
        let offsetY = 385;
        let color = this.blink ? 0 : 1;
        let colors = ["lightGrey", "Grey"];
        let x = (minimapX / width) * this.position.x + offsetX;
        let y = (minimapY / height) * this.position.y + offsetY;
        context.fillStyle = colors[1];
        context.fillRect(offsetX, offsetY, minimapX, minimapY);

        context.fillStyle = "black";
        context.fillRect(31, 366, 130, 19);

        context.fillStyle = colors[color];
        context.fillRect(x, y, 9, 9);
    }
    /**
     *
     *
     * @param {Game} game
     * @returns
     * @memberof pauseScreen
     */
    show(game: Game) {
        this.position = game.camera.position;
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
            this.minimap(context);
            return canvas;
        };

        return screen;
    }
}
