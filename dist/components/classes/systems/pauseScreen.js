import Hud from "./hud.js";
import Overworld from "../../overworld.js";
export default class pauseScreen {
    constructor(game) {
        this.frame = 0;
        this.blink = true;
        this.hud = new Hud(game);
        this.game = game;
    }
    show() {
        let canvas = document.createElement("canvas");
        const { width, height, gameState, images } = this.game;
        canvas.width = width;
        canvas.height = height;
        let context = canvas.getContext("2d");
        let middle = gameState.currentMap instanceof Overworld ? "Triforce" : "dungeonMap";
        images[9].renderSprite(context, "Inventory", [0, 0, 512, 166]);
        images[9].renderSprite(context, middle, [0, 166, 512, 195]);
        images[9].renderSprite(context, "Hud", [0, 360, 512, 120]);
        this.hud.minimap(context);
        return canvas;
    }
}
//# sourceMappingURL=pauseScreen.js.map