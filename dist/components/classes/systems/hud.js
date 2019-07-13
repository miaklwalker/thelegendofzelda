export default class Hud {
    constructor(game) {
        this.rupees = game.gameState.inventory.rupees;
        this.keys = game.gameState.inventory.keys;
        this.bombs = game.gameState.inventory.bombs;
        this.hearts = game.Link.hearts;
    }
    show(context, game) { }
}
