import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";
import gameState from "../systems/gameState.js";

export default class fourthDungeon extends Dungeon{
  constructor(){
    super('fourthDungeon',["map","compas","stepLadder","heartContainer","shardFour"])
    this.position = new Vector(1,7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon4.png"
  }
  goToOverworld(position:Vector,gameState:gameState){
    console.log("testing")
    let exit = [1,7,8,9];
    if([this.position.x,this.position.y,position.x,position.y]===exit){
      gameState.Map = 0
    }
  }
  }