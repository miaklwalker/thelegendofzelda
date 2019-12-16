import SpriteSheet from "../classes/systems/SpriteSheet.js";
import loadImage from "./loadImage.js";
let loadFiles = (game) => {
    game.gameState.maps.forEach(map => loadImage(map.url));
    game.controls.setupControls(game.messageCenter);
    game.system.addPlayer(game.Link);
    game.messageCenter.addEntities(game.Link);
    let iterator = 0;
    let names = Object.keys(game.json.urls);
    let images = Object.values(game.json.urls).map(url => loadImage(url));
    Promise.all(images).then((response) => {
        response.forEach(res => {
            let spriteSheet = new SpriteSheet(res, names[iterator]);
            spriteSheet.makeSprites(game.json);
            game.images.push(spriteSheet);
            iterator++;
        });
    });
};
export default loadFiles;
//# sourceMappingURL=loadFiles.js.map