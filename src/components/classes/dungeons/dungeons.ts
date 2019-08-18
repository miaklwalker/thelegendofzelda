import { Vector } from "../math/vector.js";
import sound from "../systems/sound.js";


/**
 *
 *
 * @export
 * @class Dungeon
 */
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
    position: Vector;
    url: string;
    theme: sound;
    constructor(name: string,equipment:string[]) {
        this.name = name;
        this.position = new Vector();
        this.url = ""
        this.keys = [];
        this.miniboss = false;
        this.item = false;
        this.lockedDoors = [];
        this.rooms = [];
        this.visitedRooms = [];
        this.boss = false;
        this.treasures=equipment
        this.theme = new sound('../music/Labyrinth.mp3')
    }

}
