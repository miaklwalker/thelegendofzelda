import { Vector } from "./classes/math/vector.js";
import sound from "./classes/systems/sound.js";
export default class Overworld {
    constructor() {
        this.position = new Vector(7, 7);
        this.theme = new sound('../music/Overworld.mp3');
        this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/overworld/zelda-overworld.png";
    }
}
