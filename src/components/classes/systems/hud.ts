import Game from "./game.js";

/**
 *
 *
 * @export
 * @class Hud
 */
export default class Hud {
    rupees: any;
    bombs: any;
    keys: any;
    hearts: any;
    /**
     *Creates an instance of Hud.
     * @param {Game} game
     * @memberof Hud
     */
    constructor(game:Game) {
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
    show(context: CanvasRenderingContext2D, game: Game) {}
}
