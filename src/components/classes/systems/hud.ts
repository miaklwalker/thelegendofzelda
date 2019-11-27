import Game from "./game.js";
import { Vector } from "../math/vector.js";
import Camera from "./Camera.js";

export default class Hud {
  rupees: any;
  bombs: any;
  keys: any;
  hearts: any;
  position: Vector;
  frame: number;
  blink: boolean;
  camera: Camera;
  game: Game;

  constructor(game: Game) {
    this.game = game;
    this.rupees = game.gameState.inventory.rupees;
    this.keys = game.gameState.inventory.keys;
    this.bombs = game.gameState.inventory.bombs;
    this.hearts = game.Link.hearts;
    this.position = new Vector();
    this.frame = 0;
    this.blink = false;
    this.camera = game.camera;
  }
  show(context: CanvasRenderingContext2D) {
    this.minimap(context);
    this.showHearts(context);
    this.showAbutton(context);
    this.showBbutton(context);
    this.showBombs(context);
    this.showRupees(context);
  }
  minimap(context: CanvasRenderingContext2D) {
    this.position = this.game.gameState.currentMap.position;
    this.frame++;
    if (this.frame % 30 === 0) {
      this.blink = !this.blink;
    }
    let minimapX = 130;
    let minimapY = 77;
    let width = 16;
    let height = 8;
    let offsetX = 31;
    let offsetY = 385;
    let color = this.blink ? 0 : 1;
    let colors = ["lightGrey", "Grey"];
    let x = (minimapX / width) * this.position.x + offsetX;
    let y = (minimapY / height) * this.position.y + offsetY;

    context.fillStyle = colors[1];
    context.fillRect(offsetX, offsetY, minimapX, minimapY);

    context.fillStyle = "black";
    context.fillRect(31, 366, 130, 19);

    context.fillStyle = colors[color];
    context.fillRect(x, y, 9, 9);
    this.showHearts(context);
  }

  showHearts(context: CanvasRenderingContext2D) {
    let index = 0;
    this.hearts = this.game.Link.hearts;
    let hearts = this.hearts;
    let health = this.game.Link.health;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 8; j++) {
        let x = 350 + j * 17;
        let y = 444 - 19.5 * i;
        let width = 17.5;
        let height = 19.6;
        if (index < health - 0.5) {
          this.game.images[9].renderSprite(context, "heart", [
            x,
            y,
            width,
            height
          ]);
        } else if (index < health) {
          this.game.images[9].renderSprite(context, "halfHeart", [
            x,
            y,
            width,
            height
          ]);
        } else if (index < hearts) {
          this.game.images[9].renderSprite(context, "emptyHeart", [
            x,
            y,
            width,
            height
          ]);
        } else {
          context.fillStyle = "black";
          context.fillRect(x, y, width, height);
        }
        index++;
      }
    }
  }
  showAbutton(context: CanvasRenderingContext2D) {
    context.fillStyle = "black";
    context.fillRect(303, 410, 18, 35);
  }
  showBbutton(context: CanvasRenderingContext2D) {
    context.fillStyle = "black";
    context.fillRect(255, 410, 18, 36);
  }
  showRupees(context: CanvasRenderingContext2D) {
    let space = 0
    const x = 192
    const y = 390
    const w = 16
    const h = 36
    for(let i = 0 ; i < 3 ; i++){
      context.fillRect(x+space*w,y,w,h);
      space++  
    }
  }
  showBombs(context: CanvasRenderingContext2D) {
    let space = 0
    const x = 192.3
    const y = 427
    const w = 16.2
    const h = 36
    for(let i = 0 ; i < 3 ; i++){
      context.fillRect(x+space*w,y,w,h);
      space++  
    }
  }
  showKeys(context: CanvasRenderingContext2D) {
    let space = 0
    const x = 192
    const y = 409
    const w = 16
    const h = 36
    for(let i = 0 ; i < 3 ; i++){
      context.fillRect(x+space*w,y,w,h);
      space++  
    }
  }
}
