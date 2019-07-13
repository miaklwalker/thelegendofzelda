import loadImage from "./getImage.js";

export default function showImage(context:CanvasRenderingContext2D,image:HTMLImageElement,[x,y,w,h,sx,sy,sw,sh]:Array<number>){
    context.drawImage(image,x,y,w,h,sx,sy,sw,sh)
}