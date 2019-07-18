import firstDungeon from "../dungeons/dungeonOne.js";
import secondDungeon from "../dungeons/dungeonTwo.js";
import thirdDungeon from "../dungeons/dungeonThree.js";
import fourthDungeon from "../dungeons/dungeonFour.js";
import fifthDungeon from "../dungeons/dungeonFive.js";
import sixthDungeon from "../dungeons/dungeonSix.js";
import seventhDungeon from "../dungeons/dungeonSeven.js";
import eighthDungeon from "../dungeons/dungeonEight.js";
import ninthDungeon from "../dungeons/dungeonNine.js";
import inventory from "./inventory.js";
import Overworld from "../../overworld.js";
/**
 *
 *
 * @export
 * @class gameState
 */
export default class gameState {
    /**
     *Creates an instance of gameState.
     * @memberof gameState
     */
    constructor() {
        this.maps = [
            new Overworld(),
            new firstDungeon(),
            new secondDungeon(),
            new thirdDungeon(),
            new fourthDungeon(),
            new fifthDungeon(),
            new sixthDungeon(),
            new seventhDungeon(),
            new eighthDungeon(),
            new ninthDungeon(),
        ];
        this.inventory = new inventory();
        this.paused = false;
        this.transition = false;
        this.currentMap = this.maps[0];
    }
    /**
     *
     *
     * @param {number} num
     * @memberof gameState
     */
    set Map(num) {
        if (num < 0 || num > 9) {
            throw new Error('Dungeon not found');
        }
        else {
            this.currentMap = this.maps[num];
        }
    }
    changeScreen(position) {
        if (position.x > 15.3) {
            position.x = 1;
            this.currentMap.position.x += 1;
        }
        if (position.x < .7) {
            position.x = 14;
            this.currentMap.position.x -= 1;
        }
        if (position.y > 9.7) {
            position.y = 1;
            this.currentMap.position.y += 1;
        }
        if (position.y < .7) {
            position.y = 9;
            this.currentMap.position.y -= 1;
        }
    }
    onMessage(msg) {
        if (msg.from === "controls") {
            //@ts-ignore
            this[msg.type] = !this[msg.type];
        }
    }
}
