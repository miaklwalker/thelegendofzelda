import Dungeon from "./dungeons.js";
import { Vector } from "../math/vector.js";

export default class ninthDungeon extends Dungeon{
  constructor(){
    super('ninthDungeon',["map","compas","silverArrows", "redRing" , "heartContainer","shardNine"])
    this.position = new Vector(7,8);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon9.png"
  }
  }