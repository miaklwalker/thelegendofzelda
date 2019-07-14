import { Vector } from "../math/vector.js";
/**
 *
 *
 * @export
 * @class Dungeon
 */
export default class Dungeon {
    constructor(name, equipment) {
        this.name = name;
        this.position = new Vector();
        this.url = "";
        this.keys = [];
        this.miniboss = false;
        this.item = false;
        this.lockedDoors = [];
        this.rooms = [];
        this.visitedRooms = [];
        this.boss = false;
        this.treasures = equipment;
    }
}
