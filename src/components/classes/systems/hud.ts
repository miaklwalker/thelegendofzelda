import Game from "./game.js";
import inventory from "./inventory.js";
import Link from "../actors/link.js";
import { Vector } from "../math/vector.js";
import camera from "./camera.js";

/**
 *
 *
 * @export
 * @class Hud
 */
export default class Hud {
    rupees: any;
    bombs: any;
    keys: any;
    hearts: any;
    position: Vector;
    frame: number;
    blink: boolean;
    camera: camera;
    /**
     *Creates an instance of Hud.
     * @param {Game} game
     * @memberof Hud
     */
    constructor(inventory:inventory,link:Link,camera:camera) {
        this.rupees = inventory.rupees;
        this.keys = inventory.keys;
        this.bombs = inventory.bombs;
        this.hearts = link.hearts;
        this.position = new Vector()
        this.frame = 0 
        this.blink = false
        this.camera = camera
    }
    minimap(context: CanvasRenderingContext2D) {
        this.position = this.camera.position
        this.frame++;
        if (this.frame % 30 === 0) {
            this.blink = !this.blink;
        }
        let minimapX = 130;
        let minimapY = 77;
        let width = 16;
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
     * @param {CanvasRenderingContext2D} context
     * @param {Game} game
     * @memberof Hud
     */
    show(context: CanvasRenderingContext2D, game: Game) {}
}
