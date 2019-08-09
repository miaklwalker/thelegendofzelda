import { Vector } from "../math/vector.js";
import uniqueid from "../../functions/createId.js";
/**
 *
 *
 * @export
 * @class Link
 * @description Will encapsulate Link , including health , position
 */
export default class Link {
    constructor() {
        this.frameAdjusted = 0;
        this.id = uniqueid();
        this.hearts = 16;
        this.health = 14.5;
        this.position = new Vector(7, 5);
        this.action = "walk";
        this.shield = "small";
        this.direction = "right";
        this.blocked = [];
    }
    show() {
        let str = `link-${this.action}-${this.direction}-${(this.frameAdjusted % 2) + 1}-${this.shield}`;
        return str;
    }
    move(msg) {
        this[msg.type] = msg.data;
        if (msg.data === "right" && !this.blocked.includes(msg.data)) {
            this.blocked = [];
            this.position.x += 0.2;
        }
        if (msg.data === "down" && !this.blocked.includes(msg.data)) {
            this.blocked = [];
            this.position.y += 0.2;
        }
        if (msg.data === "left" && !this.blocked.includes(msg.data)) {
            this.blocked = [];
            this.position.x -= 0.2;
        }
        if (msg.data === "up" && !this.blocked.includes(msg.data)) {
            this.blocked = [];
            this.position.y -= 0.2;
        }
        this.frameAdjusted++;
    }
    blocks(msg) {
        // this.blocked.push(msg.data);
    }
    onMessage(msg) {
        if (msg.type === this.id) {
            if (msg.from === "collisions") {
                this.blocks(msg);
            }
        }
        if (msg.from === "controls") {
            this.move(msg);
        }
    }
}
//# sourceMappingURL=link.js.map