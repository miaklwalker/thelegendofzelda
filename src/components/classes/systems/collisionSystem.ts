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
    
    let x = this.game.Link.position.x*32;
    let y = this.game.Link.position.y*34;
    let link = this.system.createPolygon(x,y+120,[[0,0],[0,30],[30,30],[30,0]])
    this.system.update();
    let potentials = link.potentials();
 
    for (let body of potentials) {
      if (link.collides(body, this.results)) {
        this.game.Link.position.x -= this.results.overlap_x * 0.1;
        this.game.Link.position.y -= this.results.overlap_y * 0.1;
      }
    }
    this.system.remove(link)
    this.system.update();
  }
  createMap(tilemap:number[]) {
      for (let entity of this.entities) {
        entity.remove();
      }
      this.entities = [];
      this.system.update();
      let output=[];
         for (let i = 0; i < tilemap.length / 4; i++) {
           output.push([
             tilemap[0 + i * 4],
             tilemap[1 + i * 4],
             tilemap[2 + i * 4],
             tilemap[3 + i * 4],
           ]);
         }
         return output
  }
  makeScreen(tilemap:[[number,number,number,number]]){
this.entities.forEach((entity:Polygon)=>{
this.system.remove(entity)
})
this.entities =[]
      for (let i = 0; i < tilemap.length; i++) {
        let tile:[number,number,number,number] = tilemap[i];
        let temp = this.system.createPolygon(tile[0], tile[1], [
          [0, 0],
          [0, 34],
          [32, 34],
          [32, 0],
        ]);
        this.entities.push(temp);
      }
      console.log(this.entities)
      this.system.update();
  }
  drawSystem(context: CanvasRenderingContext2D) {
    this.system.draw(context);
    this.system.drawBVH(context);
  }
  parseMap(){

  }
}
