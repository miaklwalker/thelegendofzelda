import gameState from "./gameState.js";
import Link from "../actors/link.js";
import camera from "./camera.js";
import pauseScreen from "./pauseScreen.js";
import loadImage from "../../functions/getImage.js";
import SpriteSheet from "./SpriteSheet.js";
import Controls from "./controls.js";
import MessageQueue from "./messageQueue.js";
import config from "../../objects/config.js";
import CollisionSystem from "./collisionSystem.js";
import createTileMap, { eraseTiles, exportTiles } from "../../functions/createTileMap.js";
import makeSelect from "./makeSelect.js";
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
    /**
     *Creates an instance of Game.
     * @param {number} width
     * @param {number} height
     * @param {*} json
     * @memberof Game
     */
    constructor(width, height, json) {
        this.width = width;
        this.height = height;
        this.gameState = new gameState();
        this.Link = new Link();
        this.controls = new Controls(config);
        this.json = json;
        this.system = new CollisionSystem(this);
        this.camera = new camera();
        this.pauseScreen = new pauseScreen(this);
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
    drawScreen(context) {
        const { x, y } = this.Link.position;
        let link = this.Link.show();
        let pauseMenu = this.pauseScreen.show(this);
        let paused = this.gameState.paused ? 0 : -360;
        this.system.addPlayer(this.Link);
        this.camera.show(this, context);
        this.images[5].renderSprite(context, link, [x * 32, y * 34 + 120, 30, 30,]);
        context.drawImage(pauseMenu(), 0, paused, 512, 480);
        this.rungame(context);
    }
    debugMode(context) {
        let select;
        if (!this.debugger) {
            this.debugger = true;
            exportTiles();
            select = makeSelect();
            select.id = 'Select';
            let button = document.createElement('button');
            button.innerText = ' Tile Map Viewer';
            document.body.appendChild(button);
            document.body.appendChild(select);
            button.addEventListener('click', () => {
                this.toggle = !this.toggle;
                this.toggle ? button.innerText = ' Tile Map Viewer' :
                    button.innerText = 'Create Tile Map';
                if (!this.toggle) {
                    eraseTiles();
                }
            });
        }
        if (this.toggle) {
            createTileMap(context);
        }
        else {
            this.system.drawSystem(context);
        }
    }
    rungame(context) {
        this.gameState.changeMap(this.Link.position);
        this.controls.setupControls(this.messageCenter);
        this.messageCenter.dispatch();
        this.gameState.changeScreen(this.Link.position, this);
    }
    /**
     *
     *
     * @memberof Game
     */
    loadFiles() {
        this.messageCenter.addEntities(this.Link);
        let iterator = 0;
        let names = Object.keys(this.json.urls);
        let images = Object.values(this.json.urls).map(url => loadImage(url));
        Promise.all(images).then((response) => {
            response.forEach(res => {
                let spriteSheet = new SpriteSheet(res, names[iterator]);
                if (names[iterator] == "link") {
                    spriteSheet.makeSprites(this.json);
                }
                if (names[iterator] == "enemy") {
                    spriteSheet.makeSprites(this.json);
                }
                this.images.push(spriteSheet);
                iterator++;
            });
        });
    }
}
//# sourceMappingURL=game.js.map