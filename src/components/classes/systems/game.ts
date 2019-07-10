import showImage from "../../functions/drawImage.js";
import Hud from "./hud.js"
import gameState from "./gameState.js";
import Link from "../actors/link.js";
import loadImage from "../../functions/getImage.js";

export default class Game {
    width: number;
    height: number;
    gameState: gameState;
    hud: Hud;
    Link: Link;
    json:any;
    constructor(width: number, height: number,json:any) {
        this.width = width;
        this.height = height;
        this.gameState = new gameState()
        this.Link = new Link()
        this.hud = new Hud(this.gameState.inventory,this.Link)
        this.json = json
    }
    makeGameScreen(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
    ) {
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
        loadImage(this.json.urls.font)
        .then(data=>context.drawImage(data,0,0,this.width,this.height))
        //this.hud.show(context,this,this.json);
        //this.hud.showHearts(context)
     
    }
    startScreen(context: CanvasRenderingContext2D) {}
}

/*
'../../images/system/font.png'
*/