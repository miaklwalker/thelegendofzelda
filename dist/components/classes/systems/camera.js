import loadImage from "../../functions/loadImage.js";
const mapX = 256;
const mapY = 176.1;
const height = 405;
const screenWidth = 512;
const screenHeight = 863;
const canvasX = 0;
const canvasY = (pause) => pause ? 480 : 120;
const sourceX = (x) => x * mapX;
const sourceY = (y) => y * mapY;
/**
 *
 *
 * @export
 * @class Camera
 * @description The camera displays a 512 X 360 chunk of whatever Map is passed to it
 *
 */
export default class Camera {
    /**
     *
     *
     * @param {boolean} pause Boolean declaring the game as paused or not
     * @param {(Dungeon | Overworld)} currentMap This is a instance of Dungeon or Overworld
     * @param {CanvasRenderingContext2D} context This is the main canvas rendering context for the game
     * @memberof Camera
     */
    async show(pause, currentMap, context) {
        const { url, position: mapPosition } = currentMap;
        const { x, y } = mapPosition;
        const image = await loadImage(url);
        context.drawImage(image, sourceX(x), sourceY(y), mapX, height, canvasX, canvasY(pause), screenWidth, screenHeight);
    }
}
//# sourceMappingURL=Camera.js.map