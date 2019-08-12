import loadImage from "./loadImage.js";

/**
 *
 *
 * @export
 * @param {CanvasRenderingContext2D} context
 * @param {HTMLImageElement} image
 * @param {Array<number>} [x,y,w,h,sx,sy,sw,sh]
 */
export default function showImage(context:CanvasRenderingContext2D,image:HTMLImageElement,cordinates:[number,number,number,number,number,number,number,number]){
    context.drawImage(image,...cordinates)
}