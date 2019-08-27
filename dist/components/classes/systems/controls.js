import Message from "./message.js";
import { reset } from "../../functions/directionMessage.js";
let to;
let from = "controls";
let type;
let data;
export default class Controls {
    constructor(config) {
        this.up = config.up;
        this.down = config.down;
        this.left = config.left;
        this.right = config.right;
        this.start = config.start;
        this.select = config.select;
        this.A = config.A;
        this.B = config.B;
        this.lastKey = "";
        this.keyUp = "";
        this.timeOut = 0;
    }
    setupControls(msgCenter) {
        const values = Object.values(this);
        const keys = Object.keys(this);
        document.addEventListener("keydown", event => {
            for (let i = 0; i < keys.length; i++) {
                if (event.code === values[i] && this.lastKey !== keys[i]) {
                    if (["up", "down", "left", "right", "A", "B"].includes(keys[i])) {
                        event.preventDefault();
                        this.lastKey = keys[i];
                        to = "Link";
                        type = "direction";
                        data = keys[i];
                    }
                    else {
                        this.lastKey = keys[i];
                        to = "gameState";
                        type = "paused";
                        data = keys[i];
                    }
                    let msg = new Message(to, from, type, data);
                    msgCenter.add(msg);
                }
            }
            setTimeout(() => {
                this.lastKey = "";
            });
        });
        document.addEventListener("keyup", event => {
            for (let i = 0; i < keys.length; i++) {
                if (event.code === values[i] && this.keyUp !== keys[i]) {
                    reset();
                    this.keyUp = keys[i];
                }
            }
            setTimeout(() => {
                this.lastKey = "";
            }, 150);
        });
    }
}
//# sourceMappingURL=controls.js.map