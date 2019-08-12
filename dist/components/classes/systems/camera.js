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
export default class Camera {
    async show(pause, currentMap, context) {
        const { url, position: mapPosition } = currentMap;
        const { x, y } = mapPosition;
        const image = await loadImage(url);
        context.drawImage(image, sourceX(x), sourceY(y), mapX, height, canvasX, canvasY(pause), screenWidth, screenHeight);
    }
}
//# sourceMappingURL=camera.js.map