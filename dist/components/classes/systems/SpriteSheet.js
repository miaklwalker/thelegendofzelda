/**
 *
 *
 * @export
 * @class SpriteSheet
 */
export default class SpriteSheet {
    constructor(image, name) {
        this.sheet = image;
        this.name = name;
        this.sprites = {};
    }
    /**
     *
     *
     * @param {RootObject} json
     * @memberof SpriteSheet
     * @description takes a string " 'name''direction'-'number(as word)'-'action'-'shieldSize'  "
     * and uses it as the key for an array of values
     */
    makeSprites(json) {
        let name = this.name;
        json.Sprites[name].forEach((Sprite) => {
            this.sprites[Sprite.name] = [Sprite.x, Sprite.y, Sprite.w, Sprite.h];
        });
    }
    renderSprite(context, action, location) {
        let sprite = [this.sheet, ...this.sprites[action], ...location];
        context.drawImage(...sprite);
    }
}
//# sourceMappingURL=SpriteSheet.js.map