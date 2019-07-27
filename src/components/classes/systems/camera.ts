
import Game from "./game";
import { Vector } from "../math/vector";
import loadImage from "../../functions/getImage";

export default class camera {
  position: Vector;
  constructor() {
    this.position = new Vector();
  }

  show(game: Game, context: CanvasRenderingContext2D) {
    let paused = game.gameState.paused ? 480 : 120;
    let { x, y } = this.position;
    let { url,position } = game.gameState.currentMap;
    loadImage(url).then(data => {
      this.position = position;
      context.drawImage(data, x * 256, y * 176.1, 256, 405, 0, paused, 512, 863);
    });
  }
}
