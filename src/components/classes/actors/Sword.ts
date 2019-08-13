import { Vector } from "../math/vector.js";
import uniqueId from "../../functions/uniqueId.js";

export default class Sword {
    damage: number;
    position: Vector;
    direction: string;
    types: string[];
    type: number;
    name: string;
    id: string;
    constructor(damage:number,x:number,y:number,direction:string){
        this.damage = damage;
        this.id = uniqueId()
        this.name = 'sword'
        this.position = new Vector(x,y)
        this.direction = direction
        this.types = ['wood','white','magic']
        this.type = 0
    }
    show(){
        let str = `${this.types[this.type]}-sword-${this.direction}`
        return str
    }
    placement(lx:number,ly:number,direction:string){

        let directions = [ "right" , "left" , "up" , "down"]
        let positionModifier = [new Vector(1,0),new Vector(-1,0),new Vector(0,-1),new Vector(0,1)];
        this.position = new Vector(lx,ly)
        this.position.add(positionModifier[directions.indexOf(direction)])
        let x =[ 25,  -25,   -8 , 0]
        let y =[ 3,     3, -25, 25]
        let w =30
        let h =30
        let place:[number,number,number,number];
        place = [lx*32+x[directions.indexOf(direction)],ly*34+120+y[directions.indexOf(direction)],30,30]
        return place
    }
}