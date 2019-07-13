import loadImage from "../../functions/getImage.js";
import { Vector } from "../math/vector.js";
export default class pauseScreen {
    constructor() {
        this.position = new Vector();
    }
    minimap(context) {
        let x = ((130 / 14) * this.position.x + 31);
        let y = ((77 / 8) * this.position.y + 385);
        context.fillStyle = "dimGrey";
        context.fillRect(31, 385, 130, 77);
        context.fillStyle = "black";
        context.fillRect(31, 366, 130, 19);
        context.fillStyle = "lightgray";
        context.fillRect(x, y, 9, 9);
    }
    show(game) {
        this.position = game.camera.position;
        let screen = async () => {
            let canvas = document.createElement("canvas");
            canvas.width = game.width;
            canvas.height = game.height;
            let context = canvas.getContext("2d");
            let imageOne = await loadImage(game.json.urls.hud);
            const HUD = await imageOne;
            context.drawImage(HUD, ...game.json.hud.inventory); //*inventory
            context.drawImage(HUD, ...game.json.hud.triforce); //*triforce
            context.drawImage(HUD, ...game.json.hud.top); //*hud
            this.minimap(context);
            return canvas;
        };
        return screen;
    }
}
