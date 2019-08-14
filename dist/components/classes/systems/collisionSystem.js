import { Collisions } from "../../Collisions/Collisions.js";
import { Result } from "../../Collisions/Collisions.js";
import Message from "./message.js";
import { Vector } from "../math/vector.js";
import enemy from "../actors/Enemy.js";
import { shapes } from "../../functions/TileMapper/createTileMap.js";
import Sword from "../actors/Sword.js";
const tileWidth = 32;
const tileHeight = 34;
const hudOffset = 120;
const square = [[0, 0], [0, 30], [30, 30], [30, 0]];
export default class CollisionSystem {
    constructor(game) {
        this.system = new Collisions();
        this.results = new Result();
        this.tiles = [];
        this.sprites = [];
        this.enemies = [];
        this.entities = [...this.sprites, ...this.enemies];
        this.game = game;
    }
    /**
     *
     *
     * @param {(Link | enemy | Sword)} Actor
     * @memberof CollisionSystem
     * @description Adds a Actor to the collision system assumes x = 0 - 15 and y = 1 - 10
     */
    addPlayer(Actor) {
        const { x, y } = Actor.position;
        const actualX = x * tileWidth;
        const actualY = y * tileHeight + hudOffset;
        let entity = this.system.createPolygon(actualX, actualY, square);
        entity.id = Actor.id;
        entity.name = Actor.name;
        entity.sprite = Actor;
        if (Actor instanceof enemy) {
            this.enemies.push(entity);
        }
        else {
            this.sprites.push(entity);
        }
    }
    runCollisions() {
        this.entities = [...this.sprites, ...this.enemies];
        this.entities.forEach(entity => {
            const { x, y } = entity.sprite.position;
            const actualX = x * tileWidth;
            const actualY = y * tileHeight + hudOffset;
            entity.x = actualX;
            entity.y = actualY;
            this.system.update();
            let potentials = entity.potentials();
            for (let body of potentials) {
                if (entity.collides(body, this.results)) {
                    const { a, b } = this.results;
                    if (entity.sprite.name !== "boulder") {
                        this.resolveCollision(a.sprite, b.sprite);
                        let message;
                        const to = entity.name;
                        const from = "collisions";
                        const type = entity.id;
                        let data = 'none';
                        if (this.results.overlap_x > 0) {
                            data = "right";
                        }
                        if (this.results.overlap_x < 0) {
                            data = "left";
                        }
                        if (this.results.overlap_y > 0) {
                            data = "down";
                        }
                        if (this.results.overlap_y < 0) {
                            data = "up";
                        }
                        message = new Message(to, from, type, data);
                        let cX = this.results.overlap_x * this.results.overlap;
                        let cY = this.results.overlap_y * this.results.overlap;
                        let correctionForce = new Vector(cX, cY);
                        correctionForce.div(24);
                        entity.sprite.position.subtract(correctionForce);
                    }
                }
            }
        });
    }
    createMap(tilemap) {
        if (tilemap !== undefined) {
            for (let entity of this.tiles) {
                entity.remove();
            }
            this.tiles = [];
            this.system.update();
            let output = this.parseMap(tilemap);
            return output;
        }
    }
    parseMap(tilemap) {
        let output = [];
        for (let i = 0; i < tilemap.length / 5; i++) {
            output.push([
                tilemap[0 + i * 5],
                tilemap[1 + i * 5],
                tilemap[2 + i * 5],
                tilemap[3 + i * 5],
                tilemap[4 + i * 5]
            ]);
        }
        return output;
    }
    remove(Actor) {
        for (let i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i].sprite instanceof Sword) {
                this.system.remove(this.sprites[i]);
                this.sprites.pop();
            }
        }
        if (Actor instanceof enemy) {
            for (let j = 0; j < this.enemies.length; j++) {
                if (Actor.id === this.enemies[j].sprite.id) {
                    this.system.remove(this.enemies[j]);
                    this.enemies.splice(j, 1);
                }
            }
        }
    }
    resolveCollision(a, b) {
        b.health -= a.damage;
    }
    makeScreen(tilemap) {
        if (tilemap !== undefined) {
            this.tiles.forEach((entity) => {
                this.system.remove(entity);
            });
            this.tiles = [];
            for (let i = 0; i < tilemap.length; i++) {
                let tile = tilemap[i];
                let temp = this.system.createPolygon(tile[0], tile[1], shapes[tile[4]]);
                this.tiles.push(temp);
            }
            this.system.update();
        }
    }
    drawSystem(context) {
        context.clearRect(0, 120, 512, 480);
        context.beginPath();
        this.system.update();
        this.system.draw(context);
        context.strokeStyle = "black";
        context.stroke();
    }
}
//# sourceMappingURL=collisionSystem.js.map