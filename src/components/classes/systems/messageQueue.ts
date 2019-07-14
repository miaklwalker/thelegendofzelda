import Message from "./message";

/**
 *
 *
 * @export
 * @class MessageQueue
 */
export default class MessageQueue {
    messages: any[];
    entities: any[];

    /**
     *Creates an instance of MessageQueue.
     * @memberof MessageQueue
     */
    constructor() {
        this.messages = [];
        this.entities = [];
    }

    /**
     *
     *
     * @param {Message} msg
     * @memberof MessageQueue
     */
    add(msg: Message) {
        this.messages.push(msg);
    }

    /**
     *
     *
     * @memberof MessageQueue
     */
    addEntities() {}

    /**
     *
     *
     * @memberof MessageQueue
     */
    dispatch() {
        for (let i = 0; i < this.messages.length; i++) {
            let msg = this.messages[i];
            this.entities.forEach(entity => {
                entity.onMessage(msg);
            });
            this.messages.splice(i, 1);
        }
    }
    purge() {
        this.entities = [];
    }
}
