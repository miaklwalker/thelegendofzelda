import { Vector } from "../math/vector.js";
import uniqueid from "../../functions/createId.js";
import shot from "./shot.js";
import random from "../../functions/random.js";
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
        this.jumpTimer = 0;
        this.frames = 0;
        this.chance = 1;
    }
    show() {
        let action;
        let frame = this.jumpTimer > 0 ? 1 : this.frames % 2;
        if (this.name.includes('tektite')) {
            action = 'jump';
        }
        else {
            action = 'walk';
        }
        let str = `${this.color}-${this.name}-${action}-${this.direction}-${frame + 1}`;
        return str;
    }
    timing() {
        if (this.counter % 16 === 0) {
            this.frames++;
        }
        if (this.action === 'stop' && !this.name.includes('tektite')) {
            this.counter += 150;
        }
        if (this.counter % 200 === 0) {
            this.chooseBehaviors();
            this.chooseDirection();
        }
    }
    fall() {
        if (this.counter % 60 === 0) {
            this.chance = Math.random() > .5 ? 1 : -1;
        }
        this.position.x += .01 * this.chance;
        this.position.y += .01;
    }
    jump() {
        let steps = 10;
        let resolution = 8;
        let distance = random(1, 2);
        let height = random(1, 1);
        let hor = this.direction === 'left' ? -1 : 1;
        let ver = this.direction === 'down' ? -1 : 1;
        this.jumpTimer++;
        if (this.jumpTimer === steps) {
            this.chooseBehaviors();
            this.jumpTimer = 0;
            this.chooseBehaviors();
        }
        let flip = this.jumpTimer < steps * .5 ? 1 : -1;
        if (distance === height / resolution && flip === 1) {
            height /= 2;
        }
        else if (distance === height / resolution) {
            height *= 2;
        }
        this.position.x += hor * distance / steps;
        this.position.y -= ver * height / steps;
    }
    logic(context) {
        this[this.action]();
        this.counter++;
    }
    shoot(context) {
        switch (this.direction) {
            case "right":
                this.shot = new shot(this.position.x, this.position.y, 1, 0);
                break;
            case "left":
                this.shot = new shot(this.position.x, this.position.y, -1, 0);
                break;
            case "up":
                this.shot = new shot(this.position.x, this.position.y, 0, -1);
                break;
            case "down":
                this.shot = new shot(this.position.x, this.position.y, 0, 1);
                break;
        }
        if (this.shot !== null) { }
    }
    stop() {
    }
    walk() {
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