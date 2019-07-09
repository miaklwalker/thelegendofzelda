import makeCanvas from "./components/functions/canvas.js";
import Game from "./components/classes/systems/game.js";
import loadJson from "./components/functions/getjson.js";
let canvas = makeCanvas();
let ctx = canvas.getContext("2d");
let game = new Game(512, 480);
game.makeGameScreen(canvas, ctx);
loadJson("../json/sprites.json")
    .then(data => console.log(data));
