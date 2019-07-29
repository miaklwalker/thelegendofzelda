import { Vector } from "./classes/math/vector";
import sound from "./classes/systems/sound";
export default class Overworld {
    constructor() {
        this.position = new Vector(0, 0);
        this.theme = new sound('../music/Overworld.mp3');
        this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/overworld/zelda-overworld.png";
    }
}
//# sourceMappingURL=overworld.js.map