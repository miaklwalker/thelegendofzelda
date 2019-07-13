/**
 *
 *
 * @export
 * @class Dungeon
 */
export default class Dungeon {
    constructor(name, equipment) {
        this.name = name;
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
