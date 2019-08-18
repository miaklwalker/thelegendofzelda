import { Vector } from "../math/vector.js";
import Message from "../systems/message.js";
import uniqueId from "../../functions/uniqueId.js";
import shot from "./shot.js";
import random from "../../functions/Random.js";


/**
 *
 *
 * @export
 * @class enemy
 * @description Returns a Enemy when passed a config Object
 * @param Spawn {object} MUST contain a name{string} x{number} y{number} behaviors{Array of strings} health{number} color {string} damage{number}
 */
export default class enemy {
  jumpTimer: number;
  chance: number;
  [index:string]:any
  position: Vector;
  id: string;
  behaviors: string[];
  counter: number;
  health: number;
  name: string;
  action: string;
  color: string;
  direction: string;
  shot: shot | null;
  frames: number;
  damage: any;

  /**
   *Creates an instance of enemy.
   * @param {{name: string, x: number, y: number,behaviors:string[],health:number,color:string,damage:number}} Spawn
   * @memberof enemy
   */
  constructor(Spawn:{name: string, x: number, y: number,behaviors:string[],health:number,color:string,damage:number}) {
    this.position = new Vector(Spawn.x, Spawn.y);
    this.id = uniqueId();
    this.behaviors = [...Spawn.behaviors];
    this.counter = 0;
    this.damage = Spawn.damage
    this.health = Spawn.health;
    this.name = Spawn.name;
    this.action = "walk";
    this.color = Spawn.color;
    this.direction = "down";
    this.shot = null;
    this.jumpTimer = 0;
    this.frames = 0;
    this.chance = 1;
  }
  /**
   *
   *
   * @returns
   * @memberof enemy
   */
  show() {
    let action:string 
    let frame = this.jumpTimer > 0 ? 1 : this.frames %2
    if(this.name.includes('tektite')){action = 'jump'}else{action='walk'}
    let str = `${this.color}-${this.name}-${action}-${this.direction}-${frame + 1}`;
    return str;
  }
  /**
   *
   *
   * @memberof enemy
   */
  timing() {
    if (this.counter % 16 === 0) {
      this.frames++;
    }
    if(this.action ==='stop'&&!this.name.includes('tektite')){
      this.counter+=150
    }
    if (this.counter % 200 === 0) {
      this.chooseBehaviors();
      this.chooseDirection();
    }
  }
  /**
   *
   *
   * @memberof enemy
   */
  fall(){
    if(this.counter%30===0){
     this.chance = Math.random()>.5? 1:-1
    }
    this.position.x+= .04 * this.chance
    this.position.y+= .04
    if(this.position.y*35 > 360){
      this.position.y = 0 
    }else if(this.position.x*35>512){
      this.position.x = 0 
    }else if(this.position.x*35 < 1){
      this.position.x = 14
    }

  }
  /**
   *
   *
   * @memberof enemy
   */
  jump(){
    let steps = 10 
    let resolution = 8 
    let distance = random(1,2);
    let height = random(1,1)
    let hor = this.direction === 'left' ? -1 : 1; 
    let ver = this.direction === 'down' ? -1 : 1;
    this.jumpTimer++
    if(this.jumpTimer === steps){
      this.chooseBehaviors()
      this.jumpTimer = 0 
      this.chooseBehaviors()
    }
    let flip = this.jumpTimer < steps*.5 ? 1 : -1 ;
    if(distance===height/resolution&&flip===1){
      height/=2
    }else if(distance===height/resolution){
      height*=2
    }
    this.position.x+= hor*distance/steps
    this.position.y-= ver*height/steps

  }
  /**
   *
   *
   * @param {CanvasRenderingContext2D} context
   * @memberof enemy
   */
  logic(context:CanvasRenderingContext2D) {
    if(this.action==='shoot'){
      this.shoot(context)
    }else{
      this.shot=null
      this[this.action]()
    }
    this.counter++;
  }
  /**
   *
   *
   * @param {CanvasRenderingContext2D} context
   * @memberof enemy
   */
  shoot(context:CanvasRenderingContext2D) {
    if(this.shot!==null){
      this.shot.show(context)
    }
    else{
    switch (this.direction) {
      case "right":
        this.shot = new shot(this.position.x, this.position.y, .1, 0,this.name)
        break;
      case "left":
        this.shot = new shot(this.position.x, this.position.y, -.1, 0,this.name)
        break;
      case "up":
        this.shot = new shot(this.position.x, this.position.y, 0, -.1,this.name)
        break;
      case "down":
        this.shot = new shot(this.position.x, this.position.y, 0, .1,this.name)
        break;
    }
  }
  }
  /**
   *
   *
   * @memberof enemy
   */
  stop() {
  }
  /**
   *
   *
   * @memberof enemy
   */
  walk() {
    if(this.position.x>14){
      this.direction = 'left'
    }
    if(this.position.x<.5){
      this.direction = 'right'
    }
    if(this.position.y>9.5){
      this.direction = 'up'
    }
    if(this.position.y<1){
      this.direction = 'down'
    }
    if (this.counter % 8 === 0) {
      switch (this.direction) {
        case "right":
          this.position.x += 0.2;
          break;
        case "left":
          this.position.x -= 0.2;
          break;
        case "up":
          this.position.y -= 0.2;
          break;
        case "down":
          this.position.y += 0.2;
          break;
      }
    }
  }
  /**
   *
   *
   * @memberof enemy
   */
  chooseBehaviors() {
    let behavior = Math.floor(Math.random()*this.behaviors.length);
    this.action=this.behaviors[behavior]
  }
  /**
   *
   *
   * @memberof enemy
   */
  chooseDirection() {
    let dirNum = Math.floor(Math.random() * 4);
    let directions = ["left", "right", "up", "down"];
    this.direction = directions[dirNum];
  }
  /**
   *
   *
   * @param {Message} msg
   * @memberof enemy
   */
  onMessage(msg: Message) {
    if (msg.from === "collisions" && msg.type === this.id) {
      switch (msg.data) {
        case "right":
          this.direction = "left";
          break;
        case "left":
          this.direction = "right";
          break;
        case "up":
          this.direction = "down";
          break;
        case "down":
          this.direction = "up";
          break;
      }
    }
  }
}
