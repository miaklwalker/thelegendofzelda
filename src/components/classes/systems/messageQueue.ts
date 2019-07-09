import Message from "./message";

export default class MessageQueue {
    messages: any[];
    entities: any[];
    
	constructor() {
		this.messages = [];
		this.entities = [];
	}
	add(msg:Message) {
		this.messages.push(msg);
	}
	addEntities() {

	}
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