import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";
export default class thirdDungeon extends Dungeon {
    constructor() {
        super('thirdDungeon', ["map", "compas", "raft", "heartContainer", "shardThree"]);
        this.position = new Vector(3, 5);
        this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon3.png";
    }
    goToOverworld(position, gameState) {
        let exit = [3, 5, 8, 9];
        if ([this.position.x, this.position.y, position.x, position.y] === exit) {
            gameState.Map = 0;
        }
    }
}
