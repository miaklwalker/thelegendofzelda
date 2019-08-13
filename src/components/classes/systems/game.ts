import GameState from "./gameState.js";
import Link from "../actors/link.js";
import Camera from "./Camera.js";
import PauseScreen from "./pauseScreen.js";
import loadImage from "../../functions/loadImage.js";
import RootObject, { gameScreen } from "../../objects/interfaces.js";
import SpriteSheet from "./SpriteSheet.js";
import Controls from "./controls.js";
import MessageQueue from "./messageQueue.js";
import config from "../../objects/config.js";
import CollisionSystem from "./collisionSystem.js";
import createTileMap from "../../functions/TileMapper/createTileMap.js";
import makeSelect, { selectFactory } from "../../functions/makeSelect.js";
import enemy from "../actors/Enemy.js";
import { enemies, enemyIndex } from "../../objects/enemies.js";
import { exportTiles } from "../../functions/TileMapper/exportTiles.js";
import { eraseTiles } from "../../functions/TileMapper/eraseTiles.js";
import { showPoints } from "../../functions/TileMapper/showPoints.js";
import teleporter from "../../functions/TileMapper/Teleporter.js";
import Sword from "../actors/Sword.js";

let once = false

/**
 *
 *
 * @export
 * @class Game
 * @param width The width of the game screen
 * @param height The hieght of the game screen
 * @param json A Json containing all of the games files
 *
 */
export default class Game {
  width: number;
  height: number;
  gameState: GameState;
  Link: Link;
  json: RootObject;
  camera: Camera;
  pauseScreen: PauseScreen;
  images: SpriteSheet[];
  controls: Controls;
  messageCenter: MessageQueue;
  system: CollisionSystem;
  debugger: boolean;
  toggle: boolean;
  enemies: enemy[];
  config: any;
  once:boolean;
  constructor(width: number, height: number, json: any, gameConfig: any) {
    this.width = width;
    this.height = height;
    this.enemies = [];
    this.gameState = new GameState();
    this.Link = new Link();
    this.controls = new Controls(config);
    this.json = json;
    this.config = gameConfig;
    this.system = new CollisionSystem(this);
    this.camera = new Camera();
    this.pauseScreen = new PauseScreen(this);
    this.messageCenter = new MessageQueue(this);
    this.images = [];
    this.debugger = false;
    this.once = false
    this.toggle = true;
  }


  drawScreen(context: CanvasRenderingContext2D) {
    const { x, y } = this.Link.position;
    let pauseMenu = this.pauseScreen.show();
    let paused = this.gameState.paused ? 0 : -360;
    this.system.runCollisions();
    this.camera.show(this.gameState.paused,this.gameState.currentMap, context);
    this.messageCenter.dispatch();
    this.images[3].renderSprite(context, this.Link.show(), [x * 32, y * 34 + 120, 30, 30]);
    let sword = new Sword(1.5,x*32,y*34+120,this.Link.direction)
    if(this.Link.action==='slash'){
      this.images[17].renderSprite(context,sword.show(),sword.placement(x,y,this.Link.direction))
      if(!once){
        once= true
        this.system.addPlayer(sword)
      }
    }else{
      once = false
      this.system.remove(sword)
    }

    context.drawImage(pauseMenu, 0, paused, 512, 480);
    if (!this.gameState.paused||this.gameState.transition) {
      this.rungame(context);
    }
   this.debugMode(context)
  }
  debugMode(context: CanvasRenderingContext2D) {
    let select: HTMLSelectElement;
    let select2: HTMLSelectElement;
    let input :HTMLInputElement
    let input2
    if (!this.debugger) {
      this.debugger = true;
      exportTiles();
      select = makeSelect();
      select.id = "Select";
      select2 = selectFactory('type',[['Tile','Block'],['Spawn','Spawn'],['Secret','Secret'],['Cave','Cave']]) as HTMLSelectElement
      let button = document.createElement("button");
      input = teleporter('tele')
      input2 = teleporter('porter')
      button.innerText = " Tile Map Viewer";
      document.body.appendChild(button);
      document.body.appendChild(select);
      document.body.appendChild(select2);
      document.body.appendChild(input)
      document.body.appendChild(input2)
      button.addEventListener("click", () => {
        this.toggle = !this.toggle;
        this.toggle
        ? (button.innerText = " Tile Map Viewer")
        : (button.innerText = "Create Tile Map");
        if (!this.toggle) {
          eraseTiles();
        }
      });
    }
    let tele = document.getElementById('tele') as HTMLInputElement
    let porter = document.getElementById('porter') as HTMLInputElement
    //this.gameState.currentMap.position.x = Number(tele.value)
    //this.gameState.currentMap.position.y = Number(porter.value)
    if (this.toggle) {
      
      if(!this.once){
        this.once = true
        createTileMap()
      };
      showPoints(context)
    } else {
      this.system.drawSystem(context);
    }
  }
  newScreen(index: string) {
    this.system.enemies.forEach(e => this.system.system.remove(e));
    this.enemies = [];
    this.system.enemies = [];
    let screen: gameScreen = this.config.OverWorld[index];
    let spawnPoints = this.system.parseMap(screen.spawnPoints) as number[][];
    let random:number
    screen.enemies.forEach((e: string) => {
      let chooseEnemy = enemies[enemyIndex[e]];
      let ChoosenPoint = spawnPoints.splice(random,1) as number[][];
      let badGuy = new enemy(chooseEnemy);
      badGuy.position.x = ChoosenPoint[0][0] / 32;
      badGuy.position.y = (ChoosenPoint[0][1] - 120) / 34;
      this.messageCenter.addEntities(badGuy);
      this.system.addPlayer(badGuy);
      this.enemies.push(badGuy);
    });
  }
  rungame(context: CanvasRenderingContext2D) {
    this.enemies.forEach((enem,index) => {
      if(enem.health<=0){this.enemies.splice(index,1)}
      let points = enem.show();
      enem.timing();
      enem.logic(context);
      this.images[2].renderSprite(context, points, [enem.position.x * 32,enem.position.y * 34 + 120,30,30]);
    });
    this.gameState.changeMap(this.Link.position);
    this.gameState.changeScreen(this.Link.position, this);
  }

  loadFiles() {
    this.controls.setupControls(this.messageCenter);
    this.system.addPlayer(this.Link);
    this.messageCenter.addEntities(this.Link);
    let iterator = 0;
    let names = Object.keys(this.json.urls);
    let images = Object.values(this.json.urls).map(url => loadImage(url));
    Promise.all(images).then((response: HTMLImageElement[]) => {
      response.forEach(res => {
        let spriteSheet = new SpriteSheet(res, names[iterator]);
        if (names[iterator] == "link") {
          spriteSheet.makeSprites(this.json);
        }
        if (names[iterator] == "enemy") {
          spriteSheet.makeSprites(this.json);
        }
        if (names[iterator] == "hud") {
          spriteSheet.makeSprites(this.json);
        }
        if (names[iterator] == "zeldaItems") {
          spriteSheet.makeSprites(this.json);
        }

        this.images.push(spriteSheet);
        iterator++;
      });
    });
  }
}
