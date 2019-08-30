import firstDungeon from "../dungeons/dungeonOne.js";
import secondDungeon from "../dungeons/dungeonTwo.js";
import thirdDungeon from "../dungeons/dungeonThree.js";
import fourthDungeon from "../dungeons/dungeonFour.js";
import fifthDungeon from "../dungeons/dungeonFive.js";
import sixthDungeon from "../dungeons/dungeonSix.js";
import seventhDungeon from "../dungeons/dungeonSeven.js";
import eighthDungeon from "../dungeons/dungeonEight.js";
import ninthDungeon from "../dungeons/dungeonNine.js";
import inventory from "./inventory.js";
import Overworld from "../../overworld.js";
import { Vector } from "../math/vector.js";
import Message from "./message.js";
import Game from "./game.js";
import Dungeon from "../dungeons/dungeons.js";

let index = 0;
let leftSide = -1
let topSide = 1 
let rightSide = 16
let bottomSide = 10.5
let offset = 100

let Worldmaps = [
  "OverWorld",
  "dungeonOne",
  "dungeonTwo",
  "dungeonThree",
  "dungeonFour",
  "dungeonFive",
  "dungeonSix",
  "dungeonSeven",
  "dungeonEight",
  "dungeonNine"
];

let dunLoc = [
  [7, 3, 7, 4],
  [12, 3, 7, 4],
  [4, 7, 8, 4],
  [5, 4, 8, 4],
  [11, 0, 7, 4],
  [2, 4, 7, 4],
  [2, 2, 7, 4],
  [13, 6, 10, 2],
  [5, 0, 5, 6]
];

export default class gameState {
  maps: any[];
  inventory: inventory;
  paused: boolean;
  transition: boolean;
  currentMap: Overworld | Dungeon;
  mapNum: number;
  direction:Vector
  running: Vector;
  constructor() {
    this.maps = [
      new Overworld(),
      new firstDungeon(),
      new secondDungeon(),
      new thirdDungeon(),
      new fourthDungeon(),
      new fifthDungeon(),
      new sixthDungeon(),
      new seventhDungeon(),
      new eighthDungeon(),
      new ninthDungeon()
    ];
    this.inventory = new inventory();
    this.paused = false;
    this.transition = false;
    this.mapNum=0
    this.currentMap = this.maps[0];
    this.direction = new Vector()
    this.running = new Vector();
  }
  set Map(num: number) {
    if (num < 0 || num > 9) {
      throw new Error("Dungeon not found");
    } else {
      this.mapNum=num
      this.currentMap = this.maps[num];
    }
  }
  changeScreen(position: Vector) {
    if (position.x > rightSide) {
      this.direction = new Vector(1/offset,0)
      this.running = new Vector(-rightSide/offset,0)
      this.transition = true;
    }
    if (position.x < leftSide) {
      this.direction = new Vector(-1/offset,0)
      this.running = new Vector(rightSide/offset,0)
      this.transition = true;
    }
    if (position.y > bottomSide) {
      this.direction = new Vector(0,1/offset)
      this.running = new Vector(0,-bottomSide/offset)
      this.transition = true;
    }
    if (position.y < topSide) {
      this.direction = new Vector(0,-1/offset)
      this.running = new Vector(0,bottomSide/offset)
      this.transition = true;
    }
  }
  makeScreen(game: Game){
    let map = this.currentMap.position;
      let index: string = `${Math.round(map.x)},${Math.round(map.y)}`;
      console.log(index)
      let tile = game.config[Worldmaps[this.mapNum]][index];
      console.log(tile.secrets.location)
      let tiller = [tile.hitBoxes,tile.secrets.location].flat()
      console.log(tiller)
      let tilemap = game.system.createMap(tiller) as [
        [number, number, number, number, number]
      ];
      game.system.makeScreen(tilemap);
      game.newScreen(index);
  }
  scrollScreen(position:Vector,game:Game){
    if(index<offset-1&&this.transition===true){
      if(index%4===0){game.Link.frameAdjusted++}
      this.currentMap.position.add(position)
      game.Link.position.add(this.running)
      index++
    }else{
      this.transition = false
      index = 0 
      this.currentMap.position.x = Math.round(this.currentMap.position.x)
      this.currentMap.position.y = Math.round(this.currentMap.position.y)
      this.makeScreen(game)
    }
  }
  changeMap(position: Vector,game:Game) {
    if (this.currentMap !== this.maps[0]) {
      topSide = 1
      //@ts-ignore
      this.currentMap.goToOverworld(position, this);
      this.makeScreen(game)
    } else {
      topSide= 0 
      dunLoc.forEach(([oX, oY, lX, lY], index) => {
        if (
          oX === this.currentMap.position.x &&
          oY === this.currentMap.position.y &&
          lX === Math.round(position.x) &&
          lY === Math.round(position.y)
        ) {
          this.Map = index + 1
          this.currentMap.theme.stop();
          this.makeScreen(game)
          this.currentMap.theme.play();
          position.x = 7.6;
          position.y = 7.7;
        }
      });
    }
  }
  onMessage(msg: Message) {
    if (msg.from === "controls") {
      //@ts-ignore
      this[msg.type] = !this[msg.type];
      //@ts-ignore
    }
  }
}
