import { Vector } from "../math/vector.js";
import loadImage from "../../functions/getImage.js";
import Game from "./game";
import showGrid from "../../../showScreenGrid.js";

export default class camera {
    position: Vector;
    constructor(x:number,y:number){
        this.position = new Vector(x,y);
    }
    show(game:Game,context:CanvasRenderingContext2D){
        loadImage(game.json.urls.overworld).then(data =>{
        context.drawImage(data,
            this.position.x*256   , 
            this.position.y*176.1,
            256,405,0,120,512,863
            )
                //showGrid(context);
        })
        
    }
}