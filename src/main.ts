import makeCanvas from "./components/functions/makeCanvas.js";
import Game from "./components/classes/systems/game.js";
import loadJson from "./components/functions/getJson.js";
import loadFiles from "./components/functions/loadFiles.js";

let canvas = makeCanvas() as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let game: Game;
let intro = document.getElementById('container') as HTMLDivElement


async function preload() {
  let data = await loadJson("../json/game.json");
  let config = await loadJson("../json/Gameconfig.json")
  game = new Game(512, 480, data,config);
  loadFiles(game);
  playButton()
  
}

function setup() {
  canvas.width = 512;
  canvas.height = 480;
  let index:string = `${game.gameState.currentMap.position.x},${game.gameState.currentMap.position.y}`
  let tilemap = game.system.createMap(game.config.OverWorld[index].hitBoxes) as [[number,number,number,number,number]]
  game.system.makeScreen(tilemap)
  game.newScreen(index)
  document.body.appendChild(canvas);
  draw();
}

function draw() {
  game.drawScreen(ctx);
  loop();
}

function loop() {
  requestAnimationFrame(draw);
}
preload();


function playButton(){
  let button = document.createElement("button");
  button.innerText = "Start Button";
  document.body.appendChild(button);
  button.addEventListener("click", () => {
    document.body.removeChild(intro)
    game.gameState.currentMap.theme.play();
    setup();
		document.body.removeChild(button);
	});
}

