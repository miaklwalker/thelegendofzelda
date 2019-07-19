import gameState from './gameState.js';
import Link from '../actors/link.js';
import camera from './camera.js';
import pauseScreen from './pauseScreen.js';
import loadImage from '../../functions/getImage.js';
import SpriteSheet from './SpriteSheet.js';
import Controls from './controls.js';
import MessageQueue from './messageQueue.js';
import config from '../../objects/config.js';
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
        this.camera = new camera();
        this.pauseScreen = new pauseScreen(this.gameState.inventory, this.Link, this.camera);
        this.messageCenter = new MessageQueue(this);
        this.images = [];
    }
    /**
     *
     *
     * @param {CanvasRenderingContext2D} context
     * @memberof Game
     */
    makeGameScreen(context) {
        let pauseMenu = this.pauseScreen.show(this);
        let paused = this.gameState.paused ? 0 : -360;
        this.camera.show(this, context);
        if (this.images[0] !== undefined) {
            this.images[5].renderSprite(context, this.Link.show(), [
                this.Link.position.x * 32,
                this.Link.position.y * 34 + 120,
                30,
                30,
            ]);
            context.drawImage(pauseMenu(), 0, paused, 512, 480);
            this.rungame();
        }
    }
    rungame() {
        this.gameState.changeMap(this.Link.position);
        this.controls.setupControls(this.messageCenter);
        this.messageCenter.dispatch();
        this.gameState.changeScreen(this.Link.position);
    }
    /**
     *
     *
     * @memberof Game
     */
    loadFiles() {
        let iterator = 0;
        let names = Object.keys(this.json.urls);
        let images = Object.values(this.json.urls).map(url => loadImage(url));
        Promise.all(images).then((response) => {
            response.forEach(res => {
                let spriteSheet = new SpriteSheet(res, names[iterator]);
                if (names[iterator] == 'link') {
                    spriteSheet.makeSprites(this.json);
                }
                this.images.push(spriteSheet);
                iterator++;
            });
        });
    }
}
