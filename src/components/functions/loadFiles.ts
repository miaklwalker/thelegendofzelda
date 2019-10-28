import SpriteSheet from "../classes/systems/SpriteSheet.js";
import loadImage from "./loadImage.js";
import Game from "../classes/systems/game.js";

let loadFiles=(game:Game)=>{
    game.gameState.maps.forEach(map => loadImage(map.url));
    game.controls.setupControls(game.messageCenter);
    game.system.addPlayer(game.Link);
    game.messageCenter.addEntities(game.Link);
    let iterator = 0;
    let names = Object.keys(game.json.urls);
    let images = Object.values(game.json.urls).map(url => loadImage(url));
    Promise.all(images).then((response: HTMLImageElement[]) => {
      response.forEach(res => {
        let spriteSheet = new SpriteSheet(res, names[iterator]);
        spriteSheet.makeSprites(game.json);
        game.images.push(spriteSheet);
        iterator++;
      });
    });
  }

  export default loadFiles