import makeCanvas from "./components/functions/canvas.js";
import Game from "./components/classes/systems/game.js";
import loadJson from "./components/functions/getjson.js";
import { exportTiles } from "./components/functions/createTileMap.js";

let canvas = makeCanvas() as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let game: Game;

async function preload() {
  let data = await loadJson("../json/game.json");
  game = new Game(512, 480, data);
  game.loadFiles();
  playButton()
  
}

function setup() {
  canvas.width = 512;
  canvas.height = 480;
  let index:string = `${game.gameState.currentMap.position.x},${game.gameState.currentMap.position.y}`
  let tilemap = game.system.createMap(game.json.tileMap[index]) as [[number,number,number,number,number]]
  game.system.makeScreen(tilemap)
  document.body.appendChild(canvas);
  exportTiles();
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
  button.innerText = "Play Game";
  document.body.appendChild(button);
  button.addEventListener("click", () => {
    game.gameState.currentMap.theme.play();
    setup();
		document.body.removeChild(button);
	});
}

