import makeCanvas from "./components/functions/canvas.js";
import Game from "./components/classes/systems/game.js";
import loadJson from "./components/functions/getjson.js";
import RootObject from "../src/components/objects/interfaces";
let canvas = makeCanvas() as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let game: Game;

function preload() {
    loadJson("../json/game.json")
        .then((data: RootObject) => {
            game = new Game(512, 480, data);
            game.loadFiles()
        })
        .finally(setup);
}

function setup() {
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
