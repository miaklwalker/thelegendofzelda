import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";

export default class seventhDungeon extends Dungeon{
  constructor(){
    super('seventhDungeon',["map","compas","redCandle","heartContainer","shardSeven"])
    this.position = new Vector(1,7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon7.png"
  }
  }