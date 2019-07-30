import { Collisions, Polygon } from "../../Collisions/Collisions.js";
import { Result } from "../../Collisions/Collisions.js";
import Game from "./game.js";
import Message from "./message.js";

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
        let message:Message
        let to = 'Link';
        let from = 'collisions';
        let type = 'Collision';
        console.log(this.results)
        if(this.results.overlap_x>.80){
          message = new Message(to,from,type,'right')
          this.game.messageCenter.add(message)
          console.log('right')
        }
        if(this.results.overlap_x<0){
          message = new Message(to,from,type,'left')
          this.game.messageCenter.add(message)
          console.log('left')
        }
        if(this.results.overlap_y>0){
          message = new Message(to,from,type,'down')
          this.game.messageCenter.add(message)
          console.log('Bottom')
        }
        if(this.results.overlap_y<0){
          message = new Message(to,from,type,'up')
          this.game.messageCenter.add(message)
          console.log('Top')
        }
        this.game.Link.position.x -= this.results.overlap_x * 0.07;
        this.game.Link.position.y -= this.results.overlap_y * 0.07;
      }
    }
    this.system.remove(link)
    this.system.update();
  }
  createMap(tilemap:number[]) {
    if(tilemap !== undefined){
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
      }

  makeScreen(tilemap:[[number,number,number,number]]){
    let topleft = [[0,0],[32,0],[0,34],[0,0]]
    let topright = [[0,0],[32,0],[32,32],[0,0]]
    let botleft = [[0,0],[32,34],[0,34],[0,0]]
    let botright = [[0,0],[0,34],[32,34],[0,0]]
    let square = [[0, 0],[0, 34],[32, 34],[32, 0]]
    let shapes = [topleft,topright,botleft,botright,square]
    if(tilemap!== undefined){
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
      this.system.update();
    }
  }
  drawSystem(context:CanvasRenderingContext2D,debug:boolean|string = 'draw') {
    if(debug){
      this.game.debugMode(context)
    }else if (debug === 'draw'){
    this.system.draw(context);
    this.system.drawBVH(context);
    }
  }
  parseMap(){

  }
}
