import Game from "./game.js";
import loadImage from "../../functions/getImage.js";
import showImage from "../../functions/drawImage.js";

export default class Hud {

    rupees: any;
    bombs: any;
    keys: any;
    hearts: any;
    constructor(game:Game) {
        this.rupees = game.gameState.inventory.rupees;
        this.keys = game.gameState.inventory.keys;
        this.bombs = game.gameState.inventory.bombs;
        this.hearts = game.Link.hearts;
    }
    show(context: CanvasRenderingContext2D, game: Game) {}
}
