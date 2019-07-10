import { Vector } from "../math/vector.js";
import loadImage from "../../functions/getImage.js";
export default class camera {
    constructor() {
        this.position = new Vector(1, 1);
        this.location = new Vector(1, 1);
    }
    show(game, context) {
        loadImage(game.json.overworld);
        context.fillStyle = 'saddleBrown';
        context.fillRect(0, 60, game.width, game.height);
    }
}
