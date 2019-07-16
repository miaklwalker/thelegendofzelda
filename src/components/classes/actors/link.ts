import { Vector } from "../math/vector.js";

/**
 *
 *
 * @export
 * @class Link
 * @description Will encapsulate Link , including health , position 
 */
export default class Link {
    hearts: number;
    health: number;
    position: Vector;
    frameActual: number;
    frameAdjusted: number;
    action: string;
    shield: string;
    direction: string;
    constructor(){
        this.frameActual = 0 
        this.frameAdjusted = 0 
        this.hearts = 3;
        this.health = 3;
        this.position = new Vector(8,5)
        this.action = 'walk'
        this.shield = 'big'
        this.direction = 'down'
    }
    show(){
        let numbers = ['one','one','two']
        this.frameActual++
        if(this.frameActual%24===0){this.frameAdjusted++}
        return `link-${this.action}-${this.direction}-${numbers[this.frameAdjusted%3]}-${this.shield}`
    }
}