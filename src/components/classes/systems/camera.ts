import { Vector } from "../math/vector.js";
import loadImage from "../../functions/getImage.js";
import Game from "./game";
/**
 *
 *
 * @export
 * @class camera
 * @description Is the Viewport of the game and displays a 11,16 grid of the current map
 */
export default class camera {
    position: Vector;
    constructor(){
        this.position = new Vector();
    }
    /**
     *
     *
     * @param {Game} game
     * @param {CanvasRenderingContext2D} context
     * @memberof camera
     */
    show(game:Game,context:CanvasRenderingContext2D){
        let paused = game.gameState.paused ? 480 : 120;
        loadImage(game.gameState.currentMap.url).then(data =>{
            this.position = game.gameState.currentMap.position
        context.drawImage(data,
            this.position.x*256   , 
            this.position.y*176.1,
            256,405,0,paused,512,863
            )
        })
        
    }
}