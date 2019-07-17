import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";
export default class eighthDungeon extends Dungeon {
    constructor() {
        super('eighthDungeon', ["map", "compas", "bookOfMagic", " magicalKey", "heartContainer", "shardEight"]);
        this.position = new Vector(3, 7);
        this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon8.png";
    }
}
