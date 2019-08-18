import Message from "./message.js";
import Game from "./game.js";
import enemy from "../actors/Enemy.js";
import Link from "../actors/link.js";
import gameState from "./gameState.js";

/**
 *
 *
 * @export
 * @class MessageQueue
 */
export default class MessageQueue {
    messages: any[];

    entities:Link[]|enemy[];
    game:Game

    /**
     *Creates an instance of MessageQueue.
     * @memberof MessageQueue
     */
    constructor(game:Game) {
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
    add(msg: Message) {
        this.messages.push(msg);
    }
    clearMessages(){
        this.messages=[]
    }

    /**
     *
     *
     * @memberof MessageQueue
     */
    addEntities(...entity:any) {
        let entities = [...entity]
        entities.forEach(one=>{this.entities.push(one)})
    }

    /**
     *
     *
     * @memberof MessageQueue
     */
    dispatch() {
        for (let i = 0; i < this.messages.length; i++) {
            let msg = this.messages[i];
            this.game.gameState.onMessage(msg)
            this.entities.forEach((entity:Link|enemy)=>{entity.onMessage(msg)})
            this.messages.splice(i,1);
        }

    }
    purge() {
        this.entities = [];
    }
}
