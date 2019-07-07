import makeCanvas from "./components/functions/canvas.js";
import Game from "./components/classes/game.js";

let canvas = makeCanvas() as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let game = new Game(240,240);
game.makeGameScreen(canvas,ctx);
game.startScreen(ctx);
ctx.fillRect(0, 0, canvas.width, canvas.height);
