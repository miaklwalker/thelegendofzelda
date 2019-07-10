import { Vector } from "../math/vector.js";
import loadImage from "../../functions/getImage.js";
import Game from "./game";

export default class camera {
    position: Vector;
    constructor(){
        this.position = new Vector(1,1);
        this.location = new Vector(1,1);
    }
    show(game:Game,context:CanvasRenderingContext2D){
        loadImage(game.json.overworld)
        context.fillStyle='saddleBrown'
        context.fillRect(0,60,game.width,game.height)
    }
}