import RootObject from "../../objects/interfaces";





interface SpriteSheetCor {
[index:string]:string|number
    name: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
/**
 *
 *
 * @export
 * @class SpriteSheet
 */
export default class SpriteSheet{
    sheet: HTMLImageElement;
    name: string;
    sprites: { [x: string]: [number,number,number,number]}
    constructor(image:HTMLImageElement,name:string){
        this.sheet = image;
        this.name = name;
        this.sprites = {};
    }
    /**
     *
     *
     * @param {RootObject} json
     * @memberof SpriteSheet
     * @description takes a string " 'name''direction'-'number(as word)'-'action'-'shieldSize'  "
     * and uses it as the key for an array of values
     */
    makeSprites(json:RootObject){
        let name:string = this.name 
        json.Sprites[name].forEach((Sprite:SpriteSheetCor)=>{
            this.sprites[Sprite.name]=[Sprite.x,Sprite.y,Sprite.w,Sprite.h];
        })
    }

    renderSprite(context:CanvasRenderingContext2D,action:string,location:[number,number,number,number]){
        let sprite = [this.sheet,...this.sprites[action],...location] as [HTMLImageElement,number,number,number,number,number,number,number,number]
        context.drawImage(...sprite)
    }
}