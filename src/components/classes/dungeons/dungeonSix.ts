import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";
import gameState from "../systems/gameState.js";

export default class sixthDungeon extends Dungeon{
  constructor(){
    super('sixthDungeon',["map","compas","magicRod","heartContainer","shardSix"])
    this.position = new Vector(1,7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon6.png"
  }
  goToOverworld(position:Vector,gameState:gameState){
    let exit = [1,7,7.5,9];
    const [x,y,px,py] = exit
    if(this.position.x===x&&this.position.y===y&&position.x>=px&&position.y>=py){
      gameState.Map = 0
      this.theme.stop()
      gameState.currentMap.theme.play()
      position.x = 7
      position.y = 5
    }
  }
  }