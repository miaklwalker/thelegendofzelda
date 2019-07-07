import loadImage from "./getImage.js";

export default async function showImage(context:CanvasRenderingContext2D,url:string,[x,y,w,h]:Array<number>){
    let image:HTMLImageElement = await loadImage(url)
    context.drawImage(image,x,y,w,h)
}