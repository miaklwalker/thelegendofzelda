import { Vector } from "../../../../dist/components/classes/math/vector.js";
import loadImage from "../../../../dist/components/functions/getImage.js";
import Game from "./game";

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
