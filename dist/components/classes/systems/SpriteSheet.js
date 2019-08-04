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
        //@ts-ignore
        json.Sprites[this.name].forEach((Sprite) => {
            if (this.name === "link" || this.name == 'enemy') {
                //@ts-ignore
                this.sprites[Sprite.name] = [Sprite.x, Sprite.y, Sprite.w, Sprite.h];
            }
        });
    }
    renderSprite(context, action, location) {
        //@ts-ignore
        context.drawImage(this.sheet, ...this.sprites[action], ...location);
    }
}
//# sourceMappingURL=SpriteSheet.js.map