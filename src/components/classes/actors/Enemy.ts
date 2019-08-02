import { Vector } from "../math/vector.js";
import Message from "../systems/message.js";
import uniqueid from "../../functions/createId.js";
import { logicalExpression } from "@babel/types";

export default class enemy {
  behavior: number;
  health: number;
  position: Vector;
  name: string;
  action: string;
  color: string;
  frames: number;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  direction: string;
  id: string;
  constructor(name: string) {
    this.position = new Vector(7, 7);
    this.id = uniqueid();
    this.behavior = 0;
    this.health = 0;
    this.name = name;
    this.action = "walk";
    this.color = "red";
    this.direction = "down";
    this.frames = 0;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
  }
  show() {
      this.logic()
    let str = `${this.color}-${this.name}-${this.action}-${
      this.direction
    }-${(this.frames % 2) + 1}`;
    return str;
  }

  logic() {
    if (this.action === "walk") {
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
      this.frames++ 

    }
  }
  move() {}
  chooseBehavior(numOfBehaviors: number, behaviors: string[]) {
    let behavior = Math.floor(Math.random() * numOfBehaviors);
    this.action = behaviors[behavior];
  }
  chooseDirection() {
    let dirNum = Math.floor(Math.random() * 4);
    let directions = ["left", "right", "up", "down"];
    this.direction = directions[dirNum];
  }
  onMessage(msg: Message) {
    if (msg.from === "collisions") {
    }
  }
}
