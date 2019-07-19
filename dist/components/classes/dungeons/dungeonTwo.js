import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";
export default class secondDungeon extends Dungeon {
    constructor() {
        super('secondDungeon', ["map", "compas", "magicalBoomerang", "heartContainer", "shardTwo"]);
        this.position = new Vector(1, 7);
        this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon2.png";
    }
    goToOverworld(position, gameState) {
        let exit = [1, 7, 8, 9];
        if ([this.position.x, this.position.y, position.x, position.y] === exit) {
            gameState.Map = 0;
        }
    }
}
