import loadImage from "./getImage.js";
export default async function showImage(context, url, [x, y, w, h]) {
    let image = await loadImage(url);
    context.drawImage(image, x, y, w, h);
}
//# sourceMappingURL=drawImage.js.map