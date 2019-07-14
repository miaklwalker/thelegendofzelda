/**
 *
 *
 * @export
 * @class Hud
 */
export default class Hud {
    /**
     *Creates an instance of Hud.
     * @param {Game} game
     * @memberof Hud
     */
    constructor(game) {
        this.rupees = game.gameState.inventory.rupees;
        this.keys = game.gameState.inventory.keys;
        this.bombs = game.gameState.inventory.bombs;
        this.hearts = game.Link.hearts;
    }
    /**
     *
     *
     * @param {CanvasRenderingContext2D} context
     * @param {Game} game
     * @memberof Hud
     */
    show(context, game) { }
}
