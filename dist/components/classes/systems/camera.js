import { Vector } from "../math/vector.js";
import loadImage from "../../functions/getImage.js";
export default class camera {
    constructor(x, y) {
        this.position = new Vector(x, y);
    }
    show(game, context) {
        loadImage(game.json.urls.overworld).then(data => {
            context.drawImage(data, this.position.x * 256, this.position.y * 176.1, 256, 405, 0, 120, 512, 863);
            //showGrid(context);
        });
    }
}
