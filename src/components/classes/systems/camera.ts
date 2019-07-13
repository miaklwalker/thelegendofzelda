import { Vector } from "../math/vector.js";
import loadImage from "../../functions/getImage.js";
import Game from "./game";

export default class camera {
    position: Vector;
    constructor(x:number,y:number){
        this.position = new Vector(x,y);
    }
    show(game:Game,context:CanvasRenderingContext2D){
        let paused = game.gameState.paused ? 480 : 120;
        loadImage(game.json.urls.overworld).then(data =>{
        context.drawImage(data,
            this.position.x*256   , 
            this.position.y*176.1,
            256,405,0,paused,512,863
            )
        })
        
    }
}