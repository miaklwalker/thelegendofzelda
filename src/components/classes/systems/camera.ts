
import { Vector } from "../math/vector.js";
import loadImage from "../../functions/GetImage.js";
import Overworld from "../../overworld.js";
import Dungeon from "../dungeons/dungeons.js";

export default class camera {
  position: Vector;
  map: Map<any, any>;
  constructor() {
    this.position = new Vector();
    this.map = new Map()
  }
  show(pause:boolean,currentMap:Dungeon|Overworld, context: CanvasRenderingContext2D) {
    let paused = pause ? 480 : 120;
    let { x, y } = this.position;
    let { url,position } = currentMap;
      loadImage(url).then(data => {
        this.position = position;
        this.map.set(url,data)
        context.drawImage(data, x * 256, y * 176.1, 256, 405, 0, paused, 512, 863);
      });
  }
}
