/**
 *
 *
 * @export
 * @param {CanvasRenderingContext2D} context
 * @param {HTMLImageElement} image
 * @param {Array<number>} [x,y,w,h,sx,sy,sw,sh]
 */
export default function showImage(context, image, cordinates) {
    context.drawImage(image, ...cordinates);
}
//# sourceMappingURL=drawImage.js.map