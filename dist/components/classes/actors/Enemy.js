import { Vector } from "../math/vector.js";
import uniqueid from "../../functions/createId.js";
import shot from "./shot.js";
export default class enemy {
    constructor(Spawn) {
        this.position = new Vector(Spawn.x, Spawn.y);
        this.id = uniqueid();
        this.behaviors = [...Spawn.behaviors];
        this.counter = 0;
        this.damage = Spawn.damage;
        this.health = Spawn.health;
        this.name = Spawn.name;
        this.action = "walk";
        this.color = Spawn.color;
        this.direction = "down";
        this.shot = null;
        this.frames = 0;
    }
    show() {
        let str = `${this.color}-${this.name}-${"walk"}-${this.direction}-${(this.frames % 2) + 1}`;
        return str;
    }
    timing() {
        if (this.counter % 16 === 0) {
            this.frames++;
        }
        if (this.action === 'stop') {
            this.counter += 150;
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
    }
    move() {
        if (this.position.x > 14) {
            this.direction = 'left';
        }
        if (this.position.x < .5) {
            this.direction = 'right';
        }
        if (this.position.y > 9.5) {
            this.direction = 'up';
        }
        if (this.position.y < 1) {
            this.direction = 'down';
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
    chooseBehaviors() {
        let behavior = Math.floor(Math.random() * this.behaviors.length);
        this.action = this.behaviors[behavior];
    }
    chooseDirection() {
        let dirNum = Math.floor(Math.random() * 4);
        let directions = ["left", "right", "up", "down"];
        this.direction = directions[dirNum];
    }
    onMessage(msg) {
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
//# sourceMappingURL=Enemy.js.map