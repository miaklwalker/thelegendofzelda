import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";
import gameState from "../systems/gameState.js";

export default class ninthDungeon extends Dungeon{
  constructor(){
    super('ninthDungeon',["map","compas","silverArrows", "redRing" , "heartContainer","shardNine"])
    this.position = new Vector(7,8);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon9.png"
  }
  goToOverworld(position:Vector,gameState:gameState){
    let exit = [7,8,8,9];
    if([this.position.x,this.position.y,position.x,position.y]===exit){
      gameState.Map = 0
    }
  }
  }