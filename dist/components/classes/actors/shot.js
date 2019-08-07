import { Vector } from "../math/vector.js";
export default class shot {
    constructor(x, y, vx, vy) {
        this.show = false;
        this.position = new Vector(x, y);
        this.speed = new Vector();
        this.velocity = new Vector(vx, vy);
        this.width = 30;
        this.height = 30;
    }
    shot(context) {
        this.show = true;
        context.fillStyle = 'black';
        console.log('i ran');
        context.fillRect(this.position.x * 32, this.position.y * 34 + 120, this.width, this.height);
    }
}
//# sourceMappingURL=shot.js.map