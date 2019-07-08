export default class Dungeons {
    name: string;
    keys: Array<any>;
    miniboss: boolean;
    item: boolean;
    lockedDoors: any[];
    rooms: any[];
    visitedRooms: any[];
    boss: boolean;
    constructor(name: string) {
        this.name = name;
        this.keys = [];
        this.miniboss = false;
        this.item = false;
        this.lockedDoors = [];
        this.rooms = [];
        this.visitedRooms = [];
        this.boss = false;
    }
}
