/**
 * @class Vector
 * @param x - Contains the x Value for the vector
 * @param y - Contains the y Value for the Vector
 * @method add - Adds Two Vectors Together X+X Y+Y
 * @method mult - Multiplies Either Two Vecors (X * X , Y * Y) or by a scala (X * S , Y * S)
 * @method div - The inverse of Mult Divides Either by a Vector or a Scala!
 * @method limit -Forces the Magnatude of the vector to a specified number if it is greater
 */
export class Vector {
    constructor(x = 0, y = 0) {
        this.x = x || 0;
        this.y = y || 0;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }
    addX(v) {
        this.x += v.x;
    }
    addY(v) {
        this.y += v.y;
    }
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
    subtractX(v) {
        this.x -= v.x;
    }
    subtractY(v) {
        this.y -= v.y;
    }
    mult(factor) {
        if (factor instanceof Vector) {
            this.x *= factor.x;
            this.y *= factor.y;
        }
        else {
            this.x *= factor;
            this.y *= factor;
        }
    }
    div(divisor) {
        if (divisor instanceof Vector) {
            this.x /= divisor.x;
            this.y /= divisor.y;
        }
        else {
            this.x /= divisor;
            this.y /= divisor;
        }
    }
    distanceX(v) {
        return this.x - v.x;
    }
    distanceY(v) {
        return this.y - v.y;
    }
    distance(v) {
        return Math.sqrt(this.distanceSq(v));
    }
    distanceSq(v) {
        let dx = this.distanceX(v);
        let dy = this.distanceY(v);
        return dx * dx + dy * dy;
    }
    limit(max) {
        let mSq = this.x * this.x + this.y * this.y;
        if (mSq > max * max) {
            this.div(Math.sqrt(mSq)); //normalize it
            this.mult(max);
        }
        return this;
    }
    same(Other) {
        if (Other instanceof Vector) {
            if (Other.x === this.x && Other.y === this.y) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            throw new Error("You may have passed a number instead of a vector");
        }
    }
}
