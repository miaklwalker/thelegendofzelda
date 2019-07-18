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
    frameAdjusted: number;
    action: string;
    shield: string;
    direction: string;
    constructor(){
        this.frameAdjusted = 0 
        this.hearts = 3;
        this.health = 3;
        this.position = new Vector(7,5)
        this.action = 'walk'
        this.shield = 'big'
        this.direction = 'right'
    }
    show(){
        let numbers = ['one','two']

        let str = `link-${this.action}-${this.direction}-${numbers[this.frameAdjusted%2]}-${this.shield}`
        return str
    }
    onMessage(msg:Message){
        //@ts-ignore
       this[msg.type] = msg.data;
       if(msg.data==="right"){this.position.x+=.2}
       if(msg.data==="down"){this.position.y+=.2}
       this.frameAdjusted++
       
    }
}