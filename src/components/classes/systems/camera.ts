import loadImage from "../../functions/loadImage.js";
import Overworld from "../../overworld.js";
import Dungeon from "../dungeons/dungeons.js";

const mapX = 256;
const mapY = 176.1;
const height = 405;
const screenWidth = 512;
const screenHeight = 863;
const canvasX = 0;
const canvasY = (pause: boolean) => pause ? 480 : 120;
const sourceX = (x: number)=> x * mapX;
const sourceY = (y: number) => y * mapY;

export default class Camera {
  async show(
    pause: boolean,
    currentMap: Dungeon | Overworld,
    context: CanvasRenderingContext2D
  ) {
    const { url, position: mapPosition } = currentMap;
    const { x, y } = mapPosition;
    const image = await loadImage(url);
    context.drawImage(
      image,
      sourceX(x),
      sourceY(y),
      mapX,
      height,
      canvasX,
      canvasY(pause),
      screenWidth,
      screenHeight
    );
  }
}
