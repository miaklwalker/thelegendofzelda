import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";

export default class fourthDungeon extends Dungeon{
  constructor(){
    super('fourthDungeon',["map","compas","stepLadder","heartContainer","shardFour"])
    this.position = new Vector(1,7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon4.png"
  }
  }