import { Vector } from "../math/vector.js";
import loadImage from "../../functions/getImage.js";
import { createPlayerCollision, drawsystem } from "../../functions/collisionDetection.js";
export default class camera {
    constructor() {
        this.position = new Vector();
    }
    show(game, context) {
        let paused = game.gameState.paused ? 480 : 120;
        let w = 256;
        let { x, y } = this.position;
        let { url } = game.gameState.currentMap;
        loadImage(url).then(data => {
            this.position = game.gameState.currentMap.position;
            context.drawImage(data, x * w, y * 176.1, w, 405, 0, paused, 512, 863);
            createPlayerCollision(game.Link, context);
            let index = `${game.gameState.currentMap.position.x},${game.gameState.currentMap.position.y}`;
            //@ts-ignore
            //showTileMap(game.json.tileMap[index],context)
            //createTileMap(context)
            drawsystem(context);
        });
    }
    move(game) { }
}
