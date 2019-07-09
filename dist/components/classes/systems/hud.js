import loadImage from "../../functions/getImage.js";
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
        context.fillStyle = 'saddleBrown';
        context.fillRect(0, 60, game.width, game.height);
        context.fillStyle = 'black';
        context.fillRect(0, 0, game.width, game.height * .25);
        loadImage('../../images/HUD.png')
            .then(data => context.drawImage(data, 260, 11, 250, 55.5, 0, 0, game.width, game.height * .25));
    }
}
