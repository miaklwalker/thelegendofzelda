/**
 *
 *
 * @export
 * @class MessageQueue
 */
export default class MessageQueue {
    /**
     *Creates an instance of MessageQueue.
     * @memberof MessageQueue
     */
    constructor(game) {
        this.messages = [];
        this.entities = [];
        this.game = game;
    }
    /**
     *
     *
     * @param {Message} msg
     * @memberof MessageQueue
     */
    add(msg) {
        this.messages.push(msg);
    }
    clearMessages() {
        this.messages = [];
    }
    /**
     *
     *
     * @memberof MessageQueue
     */
    addEntities(...entity) {
        let entities = [...entity];
        entities.forEach(one => { this.entities.push(one); });
    }
    /**
     *
     *
     * @memberof MessageQueue
     */
    dispatch() {
        for (let i = 0; i < this.messages.length; i++) {
            let msg = this.messages[i];
            this.game.gameState.onMessage(msg);
            this.entities.forEach((entity) => { entity.onMessage(msg); });
            this.messages.splice(i, 1);
        }
    }
    purge() {
        this.entities = [];
    }
}
//# sourceMappingURL=messageQueue.js.map