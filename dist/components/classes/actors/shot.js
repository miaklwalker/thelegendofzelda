import { Vector } from "../math/vector.js";
import { actualX, actualY } from "../../functions/tileCorConvert.js";
export default class shot {
    constructor(x, y, vx, vy, name) {
        this.name = name;
        this.shown = false;
        this.position = new Vector(x, y);
        this.speed = new Vector();
        this.velocity = new Vector(vx, vy);
        this.width = 30;
        this.height = 30;
    }
    show(context) {
        const { x, y } = this.position;
        this.shown = true;
        context.fillStyle = 'black';
        this.speed.add(this.velocity);
        this.velocity.mult(0);
        this.position.add(this.speed);
        if (this.name.includes('octo')) {
            context.fillStyle = 'saddleBrown';
            context.beginPath();
            context.ellipse(actualX(x), actualY(y), 10, 10, 0, 0, Math.PI * 2);
            context.fill();
        }
    }
}
//# sourceMappingURL=shot.js.map