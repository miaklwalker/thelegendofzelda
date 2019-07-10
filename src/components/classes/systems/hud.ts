import inventory from "./inventory.js";
import Link from "../actors/link.js";
import Game from "./game.js";
import loadImage from "../../functions/getImage.js";
import heartCover from "../../functions/heartCover.js";
import showImage from "../../functions/drawImage.js";

export default class Hud {
    map: string;
    rupees: any;
    bombs: any;
    keys: any;
    hearts: any;
    constructor(inventory:inventory,character:Link) {
  /*
  todo real map 
  */
        this.map = "Current Map";
        this.rupees = inventory.rupees;
        this.keys = inventory.keys;
        this.bombs = inventory.bombs;
        this.hearts = character.hearts;
    }
    show(context:CanvasRenderingContext2D,game:Game,json:any){
        context.fillStyle='saddleBrown'
        context.fillRect(0,60,game.width,game.height)
        loadImage(json.urls.hud)
        .then(data=>{
            context.clearRect(0,0,game.width,game.height*.25)
            let position = []
            console.log(game.width)
            showImage(context,data,json.hud.top)
            heartCover(context)
        })
    }
    showHearts(context:CanvasRenderingContext2D){
      
    }
}
