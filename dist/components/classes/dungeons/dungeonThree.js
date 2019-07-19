import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";
export default class thirdDungeon extends Dungeon {
    constructor() {
        super('thirdDungeon', ["map", "compas", "raft", "heartContainer", "shardThree"]);
        this.position = new Vector(3, 5);
        this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon3.png";
    }
    goToOverworld(position, gameState) {
        let exit = [3, 5, 7.5, 9];
        const [x, y, px, py] = exit;
        if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
            gameState.Map = 0;
            position.x = 8;
            position.y = 5;
        }
    }
}
