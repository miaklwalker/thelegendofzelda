var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Hud from "./hud.js";
import { memoize } from "../../objects/decorators.js";
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
__decorate([
    memoize
], pauseScreen.prototype, "show", null);
