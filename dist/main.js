import makeCanvas from './components/functions/canvas.js';
import Game from './components/classes/systems/game.js';
import loadJson from './components/functions/getjson.js';
let canvas = makeCanvas();
let ctx = canvas.getContext('2d');
let game;
async function preload() {
    let data = await loadJson('../json/game.json');
    game = new Game(512, 480, data);
    game.loadFiles();
    let button = document.createElement('button');
    button.innerText = 'Play Game';
    document.body.appendChild(button);
    button.addEventListener('click', () => {
        game.gameState.currentMap.theme.play();
        setup();
        document.body.removeChild(button);
    });
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
