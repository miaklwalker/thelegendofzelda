import { Collisions } from "../../Collisions/Collisions.js";
import { Result } from "../../Collisions/Collisions.js";
import enemy from "../actors/Enemy.js";
import { shapes } from "../../functions/TileMapper/createTileMap.js";
import Sword from "../actors/Sword.js";
import { reset } from "../../functions/directionMessage.js";
import { actualX, actualY } from "../../functions/tileCorConvert.js";
import collisionParser from "../../functions/collisionParser.js";
const square = [[0, 0], [0, 30], [30, 30], [30, 0]];
/**
 *
 *
 * @export
 * @class CollisionSystem
 * @description Provides a useful interface for the collision system
 */
export default class CollisionSystem {
    constructor(game) {
        this.system = new Collisions();
        this.results = new Result();
        this.tiles = [];
        this.entrances = [];
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
        let entity = this.system.createPolygon(actualX(x), actualY(y), square);
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
    addEntrance() {
    }
    /**
     *@name runCollisions
     *@description
     *
     */
    runCollisions() {
        this.entities = [...this.sprites, ...this.enemies];
        this.entities.forEach(entity => {
            const { x, y } = entity.sprite.position;
            entity.x = actualX(x);
            entity.y = actualY(y);
            this.system.update();
            let potentials = entity.potentials();
            for (let body of potentials) {
                if (entity.collides(body, this.results)) {
                    collisionParser(this.results, this.game.messageCenter);
                }
                else {
                    reset();
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