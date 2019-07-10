import makeCanvas from "./components/functions/canvas.js";
import Game from "./components/classes/systems/game.js";
import loadJson from "./components/functions/getjson.js";
let canvas = makeCanvas();
let ctx = canvas.getContext("2d");
let game;
loadJson("../json/game.json")
    .then(data => {
    console.log(data);
    game = new Game(512, 480, data);
    game.makeGameScreen(canvas, ctx);
});
