/**
 *
 *
 * @export
 * @class MessageQueue
 */
export default class MessageQueue {
    constructor(game) {
        this.messages = [];
        this.entities = [];
        this.game = game;
    }
    add(msg) {
        this.messages.push(msg);
    }
    clearMessages() {
        this.messages = [];
    }
    addEntities(...entity) {
        let entities = [...entity];
        entities.forEach(one => { this.entities.push(one); });
    }
    dispatch() {
        for (let i = 0; i < this.messages.length; i++) {
            let msg = this.messages[i];
            this.game.gameState.onMessage(msg);
            this.entities.forEach((entity) => { entity.onMessage(msg); });
            this.messages.splice(i, 1);
        }
    }
    pauseMenuDispatch() {
        for (let i = 0; i < this.messages.length; i++) {
            let msg = this.messages[i];
            if (msg.type === 'paused') {
                this.game.gameState.onMessage(msg);
                this.entities.forEach((entity) => { entity.onMessage(msg); });
            }
            this.messages.splice(i, 1);
        }
    }
    purge() {
        this.entities = [];
    }
}
//# sourceMappingURL=messageQueue.js.map