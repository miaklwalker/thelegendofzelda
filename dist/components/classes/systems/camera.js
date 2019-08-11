import { Vector } from "../math/vector.js";
import loadImage from "../../functions/GetImage.js";
export default class camera {
    constructor() {
        this.position = new Vector();
        this.map = new Map();
    }
    show(pause, currentMap, context) {
        let paused = pause ? 480 : 120;
        let { x, y } = this.position;
        let { url, position } = currentMap;
        if (this.map.has(url)) {
            let cache = this.map.get(url);
            context.drawImage(cache, x * 256, y * 176.1, 256, 405, 0, paused, 512, 863);
        }
        else {
            loadImage(url).then(data => {
                this.position = position;
                this.map.set(url, data);
                context.drawImage(data, x * 256, y * 176.1, 256, 405, 0, paused, 512, 863);
            });
        }
    }
}
//# sourceMappingURL=camera.js.map