import { Collisions, Polygon } from "../../Collisions/Collisions.js";
import { Result } from "../../Collisions/Collisions.js";
import Game from "./game.js";

export default class CollisionSystem {
  system: Collisions;
  results: Result;
  entities: Polygon[];
  game: Game;
  constructor(game: Game) {
    this.system = new Collisions();
    this.results = new Result();
    this.entities = [];
    this.game = game;
  }
  addPlayer() {
    let x = this.game.Link.position.x;
    let y = this.game.Link.position.y;
    let link = this.system.createPolygon(x, y, [
      [0, 0],
      [0, 34],
      [32, 34],
      [32, 0],
    ]);
    this.system.update();
    let potentials = link.potentials();
    for (let body of potentials) {
      if (link.collides(body, this.results)) {
        //this.game.Link.position.x -= this.results.overlap_x * 0.1;
        //this.game.Link.position.y -= this.results.overlap_y * 0.1;
      }
    }
  }
  createMap(tilemap: number[]) {
      for (let entity of this.entities) {
        entity.remove();
      }
      this.entities = [];
      this.system.update();
      let output = [];
      //@ts-ignore
      if (tilemap[0][0] === undefined) {
        for (let i = 0; i < tilemap.length / 4; i++) {
          output.push([
            tilemap[0 + i * 4],
            tilemap[1 + i * 4],
            tilemap[2 + i * 4],
            tilemap[3 + i * 4],
          ]);
        }
      } else {
        output = tilemap;
      }
      for (let i = 0; i < output.length; i++) {
        let tile = output[i];
        //@ts-ignore
        let temp = this.system.createPolygon(tile[0], tile[1], [
          [0, 0],
          [0, 34],
          [32, 34],
          [32, 0],
        ]);
        this.entities.push(temp);
      }
      this.system.update();
  }
  drawSystem(context: CanvasRenderingContext2D) {
    this.system.draw(context);
    this.system.drawBVH(context);
  }
}
