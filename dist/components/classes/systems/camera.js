import { Vector } from "../math/vector.js";
import loadImage from "../../functions/getImage.js";
import showGrid from "../../../showScreenGrid.js";
export default class camera {
    constructor() {
        this.position = new Vector(8, 2);
    }
    show(game, context) {
        loadImage(game.json.urls.overworld)
            .then(data => {
            context.drawImage(data, this.position.x * 256, this.position.y * 175, 256, 405, 0, 120, 512, 863);
            showGrid(context);
            console.log(this.position.x * 256, this.position.y * 175);
        });
    }
}
// 16 W    8 H  
// 4096    1408
// 157.5    176
//  8       8
// first Screen 
//1800 1228
