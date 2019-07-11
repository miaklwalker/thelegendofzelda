import inventory from "./inventory.js";
import Link from "../actors/link.js";
import Game from "./game.js";
import loadImage from "../../functions/getImage.js";
import heartCover from "../../functions/heartCover.js";
import showImage from "../../functions/drawImage.js";
import showGrid from "../../../showScreenGrid.js";

export default class Hud {
    map: string;
    rupees: any;
    bombs: any;
    keys: any;
    hearts: any;
    constructor(inventory: inventory, character: Link) {
        /*
  todo real map 
  */
        this.map = "Current Map";
        this.rupees = inventory.rupees;
        this.keys = inventory.keys;
        this.bombs = inventory.bombs;
        this.hearts = character.hearts;
    }
    show(context: CanvasRenderingContext2D, game: Game) {
        loadImage(game.json.urls.hud).then(data => {
            let hud = game.json.hud.top;
            showImage(context, data, hud);
        });
    }
    showInventory(game: Game) {

    }
}
