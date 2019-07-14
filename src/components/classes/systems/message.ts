


/**
 *
 *
 * @export
 * @class Message
 */
export default class Message {
    to:string
    from:string
    type:string
    data:any
	/**
	 *Creates an instance of Message.
	 * @param {string} to
	 * @param {string} from
	 * @param {string} type
	 * @param {*} data
	 * @memberof Message
	 */
	constructor(to:string, from:string, type:string, data:any) {
		this.to = to;
		this.from = from;
		this.type = type;
		this.data = data;
	}
}