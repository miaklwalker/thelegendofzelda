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
export default class gameState {
    constructor() {
        this.dungeonOne = new firstDungeon();
        this.dungeonTwo = new secondDungeon();
        this.dungeonThree = new thirdDungeon();
        this.dungeonFour = new fourthDungeon();
        this.dungeonFive = new fifthDungeon();
        this.dungeonSix = new sixthDungeon();
        this.dungeonSeven = new seventhDungeon();
        this.dungeonEight = new eighthDungeon();
        this.dungeonNine = new ninthDungeon();
        this.inventory = new inventory();
        this.paused = true;
    }
}
