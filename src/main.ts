import makeCanvas from './components/functions/canvas.js';
import Game from './components/classes/systems/game.js';
import loadJson from './components/functions/getjson.js';


let canvas = makeCanvas() as HTMLCanvasElement;
let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let game: Game;
function draw(){
loadJson('../json/game.json').then(data => {
	game = new Game(512, 480, data);
    game.makeGameScreen(canvas, ctx);
});
//requestAnimationFrame(draw)
}
draw()
