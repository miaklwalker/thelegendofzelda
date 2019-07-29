import { Collisions, Result } from "../Collisions/Collisions.js";
const system = new Collisions();
const result = new Result();
export function createPlayerCollision(Actor, context) {
    let x = Actor.position.x * 32;
    let y = Actor.position.y * 34;
    let link = system.createPolygon(x, y + 120, [[0, 0], [0, 34], [32, 34], [32, 0]]);
    system.update();
    let potentials = link.potentials();
    for (const body of potentials) {
        if (link.collides(body, result)) {
            Actor.position.x -= result.overlap_x * .1;
            Actor.position.y -= result.overlap_y * .1;
        }
    }
    context.stroke();
    system.remove(link);
    system.update();
}
export function createTerrain(context, tilemap) {
    let storage = [];
    for (let ter of storage) {
        system.remove(ter);
        system;
    }
    for (let i = 0; i < tilemap.length; i++) {
        let tile = tilemap[i];
        system.createPolygon(tile[0], tile[1], [[0, 0], [0, 34], [32, 34], [32, 0]]);
    }
}
export function drawsystem(context) {
    system.draw(context);
    context.stroke();
}
//# sourceMappingURL=collisionDetection.js.map