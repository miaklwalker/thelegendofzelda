import { Vector } from "../math/vector.js";
import loadImage from "../../functions/getImage.js";
export default class camera {
    constructor() {
        this.position = new Vector(1, 1);
        this.location = new Vector(8, 8);
    }
    show(game, context) {
        loadImage(game.json.urls.overworld)
            .then(data => {
            context.drawImage(data, 1800, 1228, 240, 240, 0, 120, game.width, game.height);
        });
        context.fillStyle = 'saddleBrown';
        context.fillRect(0, 60, game.width, game.height);
    }
}
// 16 W    8 H  
// 4096    1408
// 157.5    176
//  8       8
// first Screen 
//1800 1228
