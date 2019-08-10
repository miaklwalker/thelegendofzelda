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
        this.velocity = new Vector(0, 0);
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
        if (msg.from === 'controls') {
            this[msg.type] = msg.data;
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
        this.position.add(this.velocity);
        this.velocity.mult(0);
        this.frameAdjusted++;
    }
    onMessage(msg) {
        if (msg.to === this.id) {
        }
        if (msg.from === "controls") {
            this.move(msg);
        }
    }
}
//# sourceMappingURL=link.js.map