export default class Message {
    to:string
    from:string
    type:string
    data:any
	constructor(to:string, from:string, type:string, data:any) {
		this.to = to;
		this.from = from;
		this.type = type;
		this.data = data;
	}
}