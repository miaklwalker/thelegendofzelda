import makeCanvas from "./components/functions/canvas.js";
import Game from "./components/classes/game.js";
let canvas = makeCanvas();
let ctx = canvas.getContext("2d");
let game = new Game(240, 240);
game.makeGameScreen(canvas, ctx);
game.startScreen(ctx);
ctx.fillRect(0, 0, canvas.width, canvas.height);
