import loadImage from "../../functions/getImage.js";
import heartCover from "../../functions/heartCover.js";
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
    show(context, game, json) {
        context.fillStyle = 'saddleBrown';
        context.fillRect(0, 60, game.width, game.height);
        loadImage(json.urls.hud)
            .then(data => {
            context.clearRect(0, 0, game.width, game.height * .25);
            let position = [];
            console.log(game.width);
            showImage(context, data, json.hud.top);
            heartCover(context);
        });
    }
    showHearts(context) {
    }
}
