import { Vector } from "../math/vector.js";
import loadImage from "../../functions/getImage.js";
export default class camera {
    constructor() {
        this.position = new Vector();
    }
    show(game, context) {
        let paused = game.gameState.paused ? 480 : 120;
        let { x, y } = this.position;
        let { url, position } = game.gameState.currentMap;
        loadImage(url).then(data => {
            this.position = position;
            context.drawImage(data, x * 256, y * 176.1, 256, 405, 0, paused, 512, 863);
        });
    }
}
//# sourceMappingURL=camera.js.map