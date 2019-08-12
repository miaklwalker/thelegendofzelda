import { Vector } from "../math/vector.js";
import Message from "../systems/message.js";
import uniqueId from "../../functions/uniqueId.js";

/**
 *
 *
 * @export
 * @class Link
 * @description Will encapsulate Link , including health , position
 */
export default class Link {
  velocity: Vector;
  [index: string]: any;
  hearts: number;
  health: number;
  position: Vector;
  frame:number;
  frameAdjusted: number;
  action: string;
  shield: string;
  direction: string;
  blocked: string[];
  id: string;
  constructor() {
    this.frame = 0;
    this.frameAdjusted = 0;
    this.id = uniqueId();
    this.hearts = 16;
    this.health = 14.5;
    this.position = new Vector(7, 5);
    this.velocity = new Vector(0,0);
    this.action = "walk";
    this.shield = "small";
    this.direction = "right";
    this.blocked = [];
  }
  show() {
    
    let str = `link-${this.action}-${this.direction}-${(this.frameAdjusted %2)+1}-${this.shield}`;
    return str;
  }
  move(msg: Message) {
    if(msg.from==='controls'){
      this.direction = msg.data;
    }
    if (msg.data === "right") {
      this.velocity.x += 0.2;
    }
    if (msg.data === "down") {
      this.velocity.y += 0.2;
    }
    if (msg.data === "left") {
      this.velocity.x -= 0.2;
    }
    if (msg.data === "up") {
      this.velocity.y -= 0.2;
    }
    this.position.add(this.velocity)
    this.velocity.mult(0);
    this.frame++
    if(this.frame%2===0){
      this.frameAdjusted++;
    }
  }

  onMessage(msg: Message) {
    if (msg.from === "controls"&&msg.type==='direction') {
      this.move(msg);
    }
  }
}
