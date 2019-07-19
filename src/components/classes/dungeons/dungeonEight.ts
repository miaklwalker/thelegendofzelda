import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";
import gameState from "../systems/gameState.js";

export default class eighthDungeon extends Dungeon{
  constructor(){
    super('eighthDungeon',["map","compas","bookOfMagic", " magicalKey" , "heartContainer","shardEight"])
    this.position = new Vector(3,7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon8.png"
  }
  goToOverworld(position:Vector,gameState:gameState){
    let exit = [3,7,7.5,9];
    const [x,y,px,py] = exit
    if(this.position.x===x&&this.position.y===y&&position.x>=px&&position.y>=py){
      gameState.Map = 0
      this.theme.stop()
      gameState.currentMap.theme.play()
      position.x = 9
      position.y = 2
    }
  }
  }