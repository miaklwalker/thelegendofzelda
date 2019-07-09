import firstDungeon from "./dungeons/dungeonOne";
import secondDungeon from "./dungeons/dungeonTwo";
import thirdDungeon from "./dungeons/dungeonThree";
import fourthDungeon from "./dungeons/dungeonFour";
import fifthDungeon from "./dungeons/dungeonFive";
import sixthDungeon from "./dungeons/dungeonSix";
import seventhDungeon from "./dungeons/dungeonSeven";
import eighthDungeon from "./dungeons/dungeonEight";
import ninthDungeon from "./dungeons/dungeonNine";
import inventory from "./inventory";

export default class gameState {
    dungeonOne: firstDungeon;
    dungeonTwo: secondDungeon;
    dungeonThree: thirdDungeon;
    dungeonFour: fourthDungeon;
    dungeonFive: fifthDungeon;
    dungeonSix: sixthDungeon;
    dungeonSeven: seventhDungeon;
    dungeonEight: eighthDungeon;
    dungeonNine: ninthDungeon;
    inventory: inventory;
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
    }
}
