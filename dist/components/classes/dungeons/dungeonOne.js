import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";
export default class firstDungeon extends Dungeon {
    constructor() {
        super('firstDungeon', ["map", "compas", "bow", "boomerang", "heartContainer", "shardOne"]);
        this.position = new Vector(2, 5);
        this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon1.png";
    }
}
