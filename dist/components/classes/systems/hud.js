import loadImage from "../../functions/getImage.js";
import heartCover from "../../functions/heartCover.js";
import showImage from "../../functions/drawImage.js";
import showGrid from "../../../showScreenGrid.js";
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
    show(context, game, json) {
        loadImage(json.urls.hud)
            .then(data => {
            showImage(context, data, json.hud.top);
            showGrid(context);
            heartCover(context);
        });
    }
    showHearts(context) {
    }
}
