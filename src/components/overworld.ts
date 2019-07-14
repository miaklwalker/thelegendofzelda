import { Vector } from "./classes/math/vector.js";

export default class Overworld {
    position: Vector;
    url: string;
    constructor(){
        this.position = new Vector(7,7);
        this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/overworld/zelda-overworld.png"
    }
}