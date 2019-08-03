import { Vector } from "../math/vector.js";
import Message from "../systems/message.js";
import uniqueid from "../../functions/createId.js";
import shot from "./shot.js";

export default class enemy {
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

  constructor(Spawn:{name: string, x: number, y: number,behaviors:string[],health:number,color:string}) {
    this.position = new Vector(Spawn.x, Spawn.y);
    this.id = uniqueid();
    this.behaviors = [...Spawn.behaviors];
    this.counter = 0;
    this.health = Spawn.health;
    this.name = name;
    this.action = "walk";
    this.color = Spawn.color;
    this.direction = "down";
    this.shot = null;
    this.frames = 0;
  }
  show() {
    let str = `
    ${this.color}- 
    ${this.name}-
    ${"walk"}-
    ${this.direction}
    -${(this.frames % 2) + 1}`;
    return str;
  }
  timing() {
    if (this.counter % 16 === 0) {
      this.frames++;
    }
    if (this.counter % 200 === 0) {
      this.chooseBehaviors();
      this.chooseDirection();
    }
  }
  logic() {
    if (this.action === "walk") {
      this.move();
    }
    if (this.action === "stop") {
      this.stop();
    }
    if (this.action === "shoot") {
      this.action = "stop";
      this.shoot();
    }
    this.counter++;
  }
  shoot() {
    switch (this.direction) {
      case "right":
        this.shot = new shot(this.position.x, this.position.y, 1, 0);
        break;
      case "left":
        this.shot = new shot(this.position.x, this.position.y, 1, 0);
        break;
      case "up":
        this.shot = new shot(this.position.x, this.position.y, 1, 0);
        break;
      case "down":
        this.shot = new shot(this.position.x, this.position.y, 1, 0);
        break;
    }
  }
  stop() {
    console.log("I Stopped becuase i was tired");
  }
  move() {
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
  chooseBehaviors() {
    let behavior = Math.random()*this.behaviors.length;
    this.action=this.behaviors[behavior]
  }
  chooseDirection() {
    let dirNum = Math.floor(Math.random() * 4);
    let directions = ["left", "right", "up", "down"];
    this.direction = directions[dirNum];
  }
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
