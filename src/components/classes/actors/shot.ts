import { Vector } from "../math/vector.js";

export default class shot {
    show: boolean;
    position: Vector;
    speed: Vector;
    velocity: Vector;
    width: number;
    height: number;
  constructor(x: number,y: number,vx: number,vy: number) {
    this.show = false;
    this.position = new Vector(x,y);
    this.speed = new Vector();
    this.velocity = new Vector(vx,vy);
    this.width = 30;
    this.height = 30;
  }
  shot(context:CanvasRenderingContext2D){
      this.show = true
      context.fillStyle = 'black'
      console.log('i ran')
    context.fillRect(this.position.x*32,this.position.y*34+120,this.width,this.height)
  }
}
