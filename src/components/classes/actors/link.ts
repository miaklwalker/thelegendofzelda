import { Vector } from "../math/vector.js";
import Message from "../systems/message.js";

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
        this.direction = 'right'
    }
    show(){
        let numbers = ['one','two']
        this.frameActual++
        if(this.frameActual%6===0){this.frameAdjusted++}
        let str = `link-${this.action}-right-${numbers[this.frameAdjusted%2]}-${this.shield}`
        let tststr = `link-${this.action}-${this.direction}-${numbers[this.frameAdjusted%2]}-${this.shield}`
        console.log(tststr)
        return tststr
    }
    onMessage(msg:Message){
       console.log(this.direction , msg.data,"right");
       this.direction = msg.data;
    }
}