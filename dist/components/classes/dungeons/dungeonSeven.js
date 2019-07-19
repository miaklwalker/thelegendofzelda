import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";
export default class seventhDungeon extends Dungeon {
    constructor() {
        super('seventhDungeon', ["map", "compas", "redCandle", "heartContainer", "shardSeven"]);
        this.position = new Vector(1, 7);
        this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon7.png";
    }
    goToOverworld(position, gameState) {
        let exit = [1, 7, 7.5, 9];
        const [x, y, px, py] = exit;
        if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
            gameState.Map = 0;
            position.x = 7;
            position.y = 5;
        }
    }
}
