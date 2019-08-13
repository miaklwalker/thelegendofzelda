import { Collisions } from "../../Collisions/Collisions.js";
import { Result } from "../../Collisions/Collisions.js";
import Message from "./message.js";
import { Vector } from "../math/vector.js";
import enemy from "../actors/Enemy.js";
import Link from "../actors/link.js";
import { shapes } from "../../functions/TileMapper/createTileMap.js";
import Sword from "../actors/Sword.js";
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
    addPlayer(Actor) {
        let x = Actor.position.x * 32;
        let y = Actor.position.y * 34;
        let link = this.system.createPolygon(x, y + 120, [[0, 0], [0, 30], [30, 30], [30, 0]], 0.0);
        link.id = Actor.id;
        link.name = Actor.name;
        link.sprite = Actor;
        if (Actor instanceof Link || Actor instanceof Sword) {
            this.sprites.push(link);
        }
        else {
            this.enemies.push(link);
        }
    }
    runCollisions() {
        this.entities = [...this.sprites, ...this.enemies];
        this.entities.forEach(entity => {
            entity.x = entity.sprite.position.x * 32;
            entity.y = entity.sprite.position.y * 34 + 120;
            this.system.update();
            let potentials = entity.potentials();
            for (let body of potentials) {
                if (entity.collides(body, this.results)) {
                    if (entity.sprite.name !== "boulder") {
                        let message;
                        let to = entity.name;
                        let from = "collisions";
                        let type = entity.id;
                        if (this.results.overlap_x > 0.8) {
                            message = new Message(to, from, type, "right");
                            this.game.messageCenter.add(message);
                        }
                        if (this.results.overlap_x < 0) {
                            message = new Message(to, from, type, "left");
                            this.game.messageCenter.add(message);
                        }
                        if (this.results.overlap_y > 0) {
                            message = new Message(to, from, type, "down");
                            this.game.messageCenter.add(message);
                        }
                        if (this.results.overlap_y < 0) {
                            message = new Message(to, from, type, "up");
                            this.game.messageCenter.add(message);
                        }
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