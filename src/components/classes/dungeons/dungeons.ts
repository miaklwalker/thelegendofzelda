export default class Dungeon {
    name: string;
    keys: Array<any>;
    miniboss: boolean;
    item: boolean;
    lockedDoors: any[];
    rooms: any[];
    visitedRooms: any[];
    boss: boolean;
    treasures: string[];
    constructor(name: string,equipment:string[]) {
        this.name = name;
        this.keys = [];
        this.miniboss = false;
        this.item = false;
        this.lockedDoors = [];
        this.rooms = [];
        this.visitedRooms = [];
        this.boss = false;
        this.treasures=equipment
    }
}
