import loadImage from "../../functions/getImage.js";
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
        this.state = {
            paused: true,
        };
    }
    show(context, game) {
        loadImage(game.json.urls.hud).then(data => {
            let hudState = this.state.paused ? game.json.hud.paused : game.json.hud.top;
            let link = game.json.hud.triforce;
            let items = game.json.hud.items;
            showImage(context, data, hudState);
            showImage(context, data, link);
            showImage(context, data, items);
            showGrid(context);
        });
    }
    showHearts(game) {
    }
}
