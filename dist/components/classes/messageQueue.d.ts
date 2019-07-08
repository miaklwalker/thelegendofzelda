import Message from "./message";
export default class MessageQueue {
    messages: any[];
    entities: any[];
    constructor();
    add(msg: Message): void;
    addEntities(): void;
    dispatch(): void;
    purge(): void;
}
