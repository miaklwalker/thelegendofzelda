import { Collisions, Result } from "../Collisions/Collisions.js";
const system = new Collisions();
const result = new Result();
export function createPlayerCollision(Actor, context) {
    let link = system.createPolygon(Actor.position.x * 32, Actor.position.y * 34, [[32, 34], [32, -34], [-32, 34], [-32, -34]], 0);
    link.draw(context);
}
