import { Vector } from "./classes/math/vector.js";
import sound from "./classes/systems/sound.js";

export default class Overworld {
    position: Vector;
    url: string;
    theme: sound;
    constructor(){
        this.position = new Vector(0,0);
        this.theme = new sound('../music/Overworld.mp3')
        this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/overworld/zelda-overworld.png"
    }
}