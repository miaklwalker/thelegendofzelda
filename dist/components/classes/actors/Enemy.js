import { Vector } from "../math/vector.js";
import uniqueid from "../../functions/createId.js";
export default class enemy {
    constructor(name) {
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
        this.logic();
        let str = `${this.color}-${this.name}-${this.action}-${this.direction}-${(this.frames % 2) + 1}`;
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
            this.frames++;
        }
    }
    move() { }
    chooseBehavior(numOfBehaviors, behaviors) {
        let behavior = Math.floor(Math.random() * numOfBehaviors);
        this.action = behaviors[behavior];
    }
    chooseDirection() {
        let dirNum = Math.floor(Math.random() * 4);
        let directions = ["left", "right", "up", "down"];
        this.direction = directions[dirNum];
    }
    onMessage(msg) {
        if (msg.from === "collisions") {
        }
    }
}
//# sourceMappingURL=Enemy.js.map