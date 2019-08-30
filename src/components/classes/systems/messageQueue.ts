import Message from "./message.js";
import Game from "./game.js";
import enemy from "../actors/Enemy.js";
import Link from "../actors/link.js";

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
    constructor(game:Game) {
        this.messages = [];
        this.entities = [];
        this.game = game;
    }
    add(msg: Message) {
        this.messages.push(msg);
    }
    clearMessages(){
        this.messages=[]
    }
    addEntities(...entity:any) {
        let entities = [...entity]
        entities.forEach(one=>{this.entities.push(one)})
    }
    dispatch() {
        for (let i = 0; i < this.messages.length; i++) {
            let msg = this.messages[i];
            this.game.gameState.onMessage(msg)
            this.entities.forEach((entity:Link|enemy)=>{entity.onMessage(msg)})
            this.messages.splice(i,1);
        }
    }
    pauseMenuDispatch(){
        for (let i = 0; i < this.messages.length; i++) {
            let msg = this.messages[i];
            if(msg.type==='paused'){
            this.game.gameState.onMessage(msg)
            this.entities.forEach((entity:Link|enemy)=>{entity.onMessage(msg)})
        }
            this.messages.splice(i,1);
        }
    }
    purge() {
        this.entities = [];
    }
}
