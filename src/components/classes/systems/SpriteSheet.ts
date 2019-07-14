export default class SpriteSheet{
    sheet: HTMLImageElement;
    name: string;
    sprites: any[];
    constructor(image:HTMLImageElement,name:string){
        this.sheet = image;
        this.name = name;
        this.sprites = []
    }
    makeSprites(){}
}