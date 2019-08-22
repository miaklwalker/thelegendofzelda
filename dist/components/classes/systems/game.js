import GameState from "./gameState.js";
import Link from "../actors/link.js";
import Camera from "./Camera.js";
import PauseScreen from "./pauseScreen.js";
import loadImage from "../../functions/loadImage.js";
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
import Overworld from "../../overworld.js";
import { actualX, actualY } from "../../functions/tileCorConvert.js";
let debug = false;
let teleport = false;
document.addEventListener("keypress", event => {
    if (event.key === "d") {
        console.log(`debugger: ${!debug}`);
        debug = !debug;
    }
    if (event.key === "t") {
        console.log(`teleport:${!teleport}`);
        teleport = !teleport;
    }
});
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
    constructor(width, height, json, gameConfig) {
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
        this.once = false;
        this.toggle = true;
    }
    drawScreen(context) {
        const { x, y } = this.Link.position;
        const { paused, transition } = this.gameState;
        let pauseMenu = this.pauseScreen.show();
        let pause = this.gameState.paused ? 0 : -360;
        let linkLocation = [
            actualX(x),
            actualY(y),
            30,
            30
        ];
        this.camera.show(this.gameState.paused, this.gameState.currentMap, context);
        this.images[3].renderSprite(context, this.Link.show(), linkLocation);
        this.Link.slash(context, this.system, this.images[17]);
        context.drawImage(pauseMenu, 0, pause, 512, 480);
        if (this.gameState.transition) {
            this.messageCenter.clearMessages();
            this.gameState.scrollScreen(this.gameState.direction, this);
        }
        if (!paused && !transition) {
            this.rungame(context);
            this.messageCenter.dispatch();
        }
        if (debug) {
            if (this.gameState.currentMap instanceof Overworld) {
                this.gameState.currentMap.debug();
            }
            this.debugMode(context);
        }
        else {
            if (this.gameState.currentMap instanceof Overworld) {
                this.gameState.currentMap.normal();
            }
        }
    }
    debugMode(context) {
        let select;
        let select2;
        let input;
        let input2;
        if (!this.debugger) {
            this.debugger = true;
            exportTiles();
            select = makeSelect();
            select.id = "Select";
            select2 = selectFactory("type", [
                ["Tile", "Block"],
                ["Spawn", "Spawn"],
                ["Secret", "Secret"],
                ["Cave", "Cave"]
            ]);
            let button = document.createElement("button");
            input = teleporter("tele", "15");
            input2 = teleporter("porter", "7");
            button.innerText = " Tile Map Viewer";
            document.body.appendChild(button);
            document.body.appendChild(select);
            document.body.appendChild(select2);
            document.body.appendChild(input);
            document.body.appendChild(input2);
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
            let tele = document.getElementById("tele");
            let porter = document.getElementById("porter");
            if (teleport) {
                this.gameState.currentMap.position.x = Number(tele.value);
                this.gameState.currentMap.position.y = Number(porter.value);
            }
            else {
                tele.value = `${this.gameState.currentMap.position.x}`;
                porter.value = `${this.gameState.currentMap.position.y}`;
            }
            if (!this.once) {
                this.once = true;
                createTileMap();
            }
            showPoints(context);
        }
        else {
            this.system.drawSystem(context);
        }
    }
    newScreen(index) {
        this.system.enemies.forEach(e => this.system.system.remove(e));
        this.enemies = [];
        this.system.enemies = [];
        let screen = this.config.OverWorld[index];
        let spawnPoints = this.system.parseMap(screen.spawnPoints);
        let random;
        screen.enemies.forEach((e) => {
            random = Math.floor(Math.random() * spawnPoints.length);
            let chooseEnemy = enemies[enemyIndex[e]];
            let ChoosenPoint = spawnPoints.splice(random, 1);
            let badGuy = new enemy(chooseEnemy);
            badGuy.position.x = ChoosenPoint[0][0] / 32;
            badGuy.position.y = (ChoosenPoint[0][1] - 120) / 34;
            this.messageCenter.addEntities(badGuy);
            this.system.addPlayer(badGuy);
            this.enemies.push(badGuy);
        });
    }
    rungame(context) {
        this.enemies.forEach((enem, index) => {
            if (enem.health <= 0) {
                this.enemies.splice(index, 1);
                this.system.remove(enem);
            }
            let points = enem.show();
            enem.timing();
            enem.logic(context);
            let location = [
                actualX(enem.position.x),
                actualY(enem.position.y),
                30,
                30
            ];
            this.images[2].renderSprite(context, points, location);
        });
        this.system.runCollisions();
        this.gameState.changeMap(this.Link.position, this);
        this.gameState.changeScreen(this.Link.position, this);
    }
    loadFiles() {
        this.gameState.maps.forEach(map => loadImage(map.url));
        this.controls.setupControls(this.messageCenter);
        this.system.addPlayer(this.Link);
        this.messageCenter.addEntities(this.Link);
        let iterator = 0;
        let names = Object.keys(this.json.urls);
        let images = Object.values(this.json.urls).map(url => loadImage(url));
        Promise.all(images).then((response) => {
            response.forEach(res => {
                let spriteSheet = new SpriteSheet(res, names[iterator]);
                spriteSheet.makeSprites(this.json);
                this.images.push(spriteSheet);
                iterator++;
            });
        });
    }
}
//# sourceMappingURL=game.js.map