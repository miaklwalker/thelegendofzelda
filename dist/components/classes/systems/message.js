/**
 *
 *
 * @export
 * @class Message
 */
export default class Message {
    /**
     *Creates an instance of Message.
     * @param {string} to
     * @param {string} from
     * @param {string} type
     * @param {*} data
     * @memberof Message
     */
    constructor(to, from, type, data) {
        this.to = to;
        this.from = from;
        this.type = type;
        this.data = data;
    }
}
//# sourceMappingURL=message.js.map