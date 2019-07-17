import makeCanvas from "./components/functions/canvas.js";
import Game from "./components/classes/systems/game.js";
import loadJson from "./components/functions/getjson.js";
let canvas = makeCanvas();
let ctx = canvas.getContext("2d");
let game;
function preload() {
    loadJson("../json/game.json")
        .then((data) => {
        game = new Game(512, 480, data);
        game.loadFiles();
        console.log(game.images);
    })
        .finally(setup);
}
function setup() {
    console.log(game.images[0]);
    canvas.width = 512;
    canvas.height = 480;
    document.body.appendChild(canvas);
    draw();
}
function draw() {
    game.makeGameScreen(ctx);
    loop();
}
function loop() {
    requestAnimationFrame(draw);
}
preload();
