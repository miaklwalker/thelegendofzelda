import loadImage from "../../functions/getImage.js";
import showImage from "../../functions/drawImage.js";
export default class Hud {
    constructor(inventory, character) {
        /*
  todo real map
  */
        this.map = "Current Map";
        this.rupees = inventory.rupees;
        this.keys = inventory.keys;
        this.bombs = inventory.bombs;
        this.hearts = character.hearts;
    }
    show(context, game) {
        loadImage(game.json.urls.hud).then(data => {
            let hud = game.json.hud.top;
            showImage(context, data, hud);
        });
    }
    showInventory(game) {
    }
}
