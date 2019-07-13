export default function showImage(context, image, [x, y, w, h, sx, sy, sw, sh]) {
    context.drawImage(image, x, y, w, h, sx, sy, sw, sh);
}
