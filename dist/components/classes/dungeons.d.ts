export default class Dungeons {
    name: string;
    keys: Array<any>;
    miniboss: boolean;
    item: boolean;
    lockedDoors: any[];
    rooms: any[];
    visitedRooms: any[];
    boss: boolean;
    constructor(name: string);
}
