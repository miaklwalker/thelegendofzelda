import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";
export default class fifthDungeon extends Dungeon {
    constructor() {
        super('FifthDungeon', ["map", "compas", "recorder", "heartContainer", "shardFive"]);
        this.position = new Vector(2, 7);
        this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon5.png";
    }
    goToOverworld(position, gameState) {
        let exit = [2, 7, 7.5, 9];
        const [x, y, px, py] = exit;
        if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
            gameState.Map = 0;
            position.x = 7;
            position.y = 5;
        }
    }
}
