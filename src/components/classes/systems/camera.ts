
import Game from "./game.js";
import { Vector } from "../math/vector.js";
import loadImage from "../../functions/getImage.js";

export default class camera {
  position: Vector;
  map: Map<any, any>;
  constructor() {
    this.position = new Vector();
    this.map = new Map()
  }
  show(game: Game, context: CanvasRenderingContext2D) {
    let paused = game.gameState.paused ? 480 : 120;
    let { x, y } = this.position;
    let { url,position } = game.gameState.currentMap;
    if(this.map.has(url)){
      let cache = this.map.get(url)
      context.drawImage(cache ,x*256,y*176.1,256,405,0,paused,512,863)
    }else{
      loadImage(url).then(data => {
        this.position = position;
        this.map.set(url,data)
        context.drawImage(data, x * 256, y * 176.1, 256, 405, 0, paused, 512, 863);
      });
    }
  }
}
