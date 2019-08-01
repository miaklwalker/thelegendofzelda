import { Collisions, Polygon } from "../../Collisions/Collisions.js";
import { Result } from "../../Collisions/Collisions.js";
import Game from "./game.js";
import Message from "./message.js";
import { Vector } from "../math/vector.js";

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
  addPlayer(context:CanvasRenderingContext2D) {
    
    let x = this.game.Link.position.x*32;
    let y = this.game.Link.position.y*34;
    let link = this.system.createPolygon(x,y+120,[[0,0],[0,30],[30,30],[30,0]],0.0)
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
        context.strokeStyle ='red';
        this.results.a.draw(context)
        this.results.b.draw(context)
        context.stroke()
        let cX = this.results.overlap_x * this.results.overlap
        let cY = this.results.overlap_y * this.results.overlap
        console.log(cX,cY)
        let correctionForce = new Vector(cX,cY)
        correctionForce.div(30)
        this.game.Link.position.subtract(correctionForce)
      }
    }
    context.strokeStyle='black'
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
      let output =[]
         for (let i = 0; i < tilemap.length / 5; i++) {
           output.push([
             tilemap[0 + i * 5],
             tilemap[1 + i * 5],
             tilemap[2 + i * 5],
             tilemap[3 + i * 5],
             tilemap[4 + i * 5]
           ]);
         }
         return output as [[number,number,number,number,number]]
        }
      }

  makeScreen(tilemap:[[number,number,number,number,number]]){
    let x = 0 
    let y = 0 
    let w = 32 
    let h = 34
    let offset = 11
    let topleft = [[x,y],[x,h],[w,y]]
    let topright = [[x,y],[w,y],[w,h]]
    let botleft = [[x,y],[x,h],[w,h]]
    let botright = [[w,y],[w,h],[x,h]]
    let square = [[0, 0],[0, 34],[32, 34],[32, 0]]
    let shapes = [topleft,topright,botleft,botright,square]
    if(tilemap!== undefined){
this.entities.forEach((entity:Polygon)=>{
this.system.remove(entity)
})
this.entities =[]
      for (let i = 0; i < tilemap.length; i++) {
        let tile:[number,number,number,number,number] = tilemap[i];
        let temp = this.system.createPolygon(tile[0], tile[1],shapes[tile[4]]);
        this.entities.push(temp);
      }
      this.system.update();
    }
  }
  drawSystem(context:CanvasRenderingContext2D) {
    this.system.draw(context);
    //this.system.drawBVH(context);
    context.strokeStyle = 'black';
    context.stroke()
  }
}
