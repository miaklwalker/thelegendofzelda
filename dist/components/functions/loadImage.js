/**
 *
 *
 * @export
 * @param {string} url
 * @returns
 */
export default function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve(image);
        });
        image.src = url;
    });
}
//# sourceMappingURL=loadImage.js.map