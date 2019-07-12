import loadImage from "../../functions/getImage.js";
export default class pauseScreen {
    constructor() { }
    show(game) {
        let screen = async () => {
            let canvas = document.createElement('canvas');
            canvas.width = game.width;
            canvas.height = game.height;
            let context = canvas.getContext('2d');
            let imageOne = await loadImage(game.json.urls.hud);
            const HUD = await imageOne;
            context.drawImage(HUD, 0, 20, 255, 80, 0, 0, 512, 180); //*inventory
            context.drawImage(HUD, 0, 110, 255, 90, 0, 154, 512, 187); //*triforce
            context.drawImage(HUD, 258, 11, 255.5, 55.5, 0, 340, 512, 120); //*hud
            return canvas;
        };
        return screen;
    }
}
