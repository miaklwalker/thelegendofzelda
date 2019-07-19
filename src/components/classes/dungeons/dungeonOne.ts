import Dungeon from  "./dungeons.js"
import { Vector } from "../math/vector.js";
import gameState from "../systems/gameState.js";

export default class firstDungeon extends Dungeon{
constructor(){
  super('firstDungeon',["map","compas","bow","boomerang","heartContainer","shardOne"])
  this.position = new Vector(2,5);
  this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon1.png"
}
goToOverworld(position:Vector,gameState:gameState){
  console.log('testing')
  let exit = [2,5,8,9];
  console.log(position)
  if([this.position.x,this.position.y,Math.round(position.x),Math.round(position.y)]===exit){
    
    gameState.Map = 0
    console.log('going to over world')
  }

}
}