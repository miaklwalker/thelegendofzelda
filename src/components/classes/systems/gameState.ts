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

/**
 *
 *
 * @export
 * @class gameState
 */

export default class gameState {
  maps: any[];
  inventory: inventory;
  paused: boolean;
  transition: boolean;
  currentMap: Overworld | Dungeon;
  mapNum: number;
  /**
   *Creates an instance of gameState.
   * @memberof gameState
   */
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
  }

  set Map(num: number) {
    if (num < 0 || num > 9) {
      throw new Error("Dungeon not found");
    } else {
      this.mapNum=num
      this.currentMap = this.maps[num];
    }
  }

  changeScreen(position: Vector, game: Game) {
    let map = this.currentMap.position;
    if (position.x > 15) {
      position.x = 1;
      map.x += 1;
      this.transition = true;
    }
    if (position.x < 0.7) {
      position.x = 14;
      map.x -= 1;
      this.transition = true;
    }
    if (position.y > 9.7) {
      position.y = 1;
      map.y += 1;
      this.transition = true;
    }
    if (position.y < 0.7) {
      position.y = 9;
      map.y -= 1;
      this.transition = true;
    }
    if (this.transition) {
      this.transition = false
      let index: string = `${map.x},${map.y}`;
      let tiller = game.config[Worldmaps[this.mapNum]][index].hitBoxes;
      let tilemap = game.system.createMap(tiller) as [
        [number, number, number, number, number]
      ];
      game.system.makeScreen(tilemap);
      game.newScreen(index);
      this.transition = false;
    }
  }
  changeMap(position: Vector,game:Game) {
    if (this.currentMap !== this.maps[0]) {
      //@ts-ignore
      this.currentMap.goToOverworld(position, this);
      this.transition = true
    } else {
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
      dunLoc.forEach(([oX, oY, lX, lY], index) => {
        if (
          oX === this.currentMap.position.x &&
          oY === this.currentMap.position.y &&
          lX === Math.round(position.x) &&
          lY === Math.round(position.y)
        ) {
          this.Map = index + 1
          this.currentMap.theme.stop();
          this.transition = true
          this.changeScreen(position,game)
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
    }
  }
}
