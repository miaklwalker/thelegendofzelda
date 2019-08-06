import GameState from "./gameState.js";
import Link from "../actors/link.js";
import Camera from "./camera.js";
import PauseScreen from "./pauseScreen.js";
import loadImage from "../../functions/getImage.js";
import RootObject, { gameScreen } from "../../objects/interfaces.js";
import SpriteSheet from "./SpriteSheet.js";
import Controls from "./controls.js";
import MessageQueue from "./messageQueue.js";
import config from "../../objects/config.js";
import CollisionSystem from "./collisionSystem.js";
import createTileMap, {
  eraseTiles,
  exportTiles
} from "../../functions/createTileMap.js";
import makeSelect from "./makeSelect.js";
import enemy from "../actors/Enemy.js";
import { enemies, enemyIndex } from "../../objects/enemies.js";

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
  /**
   *Creates an instance of Game.
   * @param {number} width
   * @param {number} height
   * @param {*} json
   * @memberof Game
   */
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
    this.toggle = true;
  }

  /**
   *
   *
   * @param {CanvasRenderingContext2D} context
   * @memberof Game
   */
  drawScreen(context: CanvasRenderingContext2D) {
    const { x, y } = this.Link.position;
    let link = this.Link.show();
    let pauseMenu = this.pauseScreen.show(this);
    let paused = this.gameState.paused ? 0 : -360;
    this.system.runCollisions();
    this.camera.show(this, context);
    this.messageCenter.dispatch();
    this.images[5].renderSprite(context, link, [x * 32, y * 34 + 120, 30, 30]);
    context.drawImage(pauseMenu(), 0, paused, 512, 480);
    if (!this.gameState.paused) {
      this.rungame(context);
    }
    this.controls.setupControls(this.messageCenter);
  }
  debugMode(context: CanvasRenderingContext2D) {
    let select: HTMLSelectElement;
    if (!this.debugger) {
      this.debugger = true;
      exportTiles();
      select = makeSelect();
      select.id = "Select";
      let button = document.createElement("button");
      button.innerText = " Tile Map Viewer";
      document.body.appendChild(button);
      document.body.appendChild(select);
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

    if (this.toggle) {
      createTileMap(context);
    } else {
      this.system.drawSystem(context);
    }
  }
  newScreen(index: string) {
    this.enemies = [];
    this.system.enemies.forEach(e => {
      this.system.system.remove(e);
    });
    this.system.enemies = [];
    let screen: gameScreen = this.config.OverWorld[index];
    let spawnPoints = this.system.parseMap(screen.spawnPoints) as number[][];
    screen.enemies.forEach((e: string) => {
      let chooseEnemy = enemies[enemyIndex[e]];
      let ChoosenPoint = spawnPoints.pop() as number[];
      console.log(ChoosenPoint);
      let badGuy = new enemy(chooseEnemy);
      badGuy.position.x = ChoosenPoint[0] / 32;
      badGuy.position.y = (ChoosenPoint[1] - 120) / 34;
      this.messageCenter.addEntities(badGuy);
      this.system.addPlayer(badGuy);
      this.enemies.push(badGuy);
    });
  }
  rungame(context: CanvasRenderingContext2D) {
    this.enemies.forEach(enem => {
      let points = enem.show();
      enem.timing();
      enem.logic();
      this.images[2].renderSprite(context, points, [
        enem.position.x * 32,
        enem.position.y * 34 + 120,
        30,
        30
      ]);
    });
    this.gameState.changeMap(this.Link.position);
    this.gameState.changeScreen(this.Link.position, this);
  }
  /**
   *
   *
   * @memberof Game
   */
  loadFiles() {
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

        this.images.push(spriteSheet);
        iterator++;
      });
    });
  }
}
