import controlsConfig from './controllerConfig.js';
import MessageQueue from './messageQueue.js';
import Message from './message.js';

export default class Controls {
	up: string;
	down: string;
	left: string;
	right: string;
	start: string;
	select: string;
	A: string;
	B: string;
	lastKey: string;
	keyUp: string;
	timeOut: number;
	constructor(config: controlsConfig) {
		this.up = config.up;
		this.down = config.down;
		this.left = config.left;
		this.right = config.right;
		this.start = config.start;
		this.select = config.select;
		this.A = config.A;
		this.B = config.B;
		this.lastKey = '';
		this.keyUp = '';
		this.timeOut = 0;
	}
	setupControls(msgCenter: MessageQueue) {
		const values = Object.values(this);
		const keys = Object.keys(this);
		document.addEventListener('keydown', event => {
			for (let i = 0; i < keys.length; i++) {
				if (event.code === values[i] &&this.lastKey !== keys[i]) {
					if (['up','down','left','right','A','B',].includes(keys[i])
					) {
						this.lastKey = keys[i];
						let msg: Message = new Message(
							'Link',
							'controls',
							'direction',
							keys[i],
						);
						msgCenter.add(msg);
					} else {
						this.lastKey = keys[i];
						let msg: Message = new Message(
							'gameState',
							'controls',
							'paused',
							keys[i],
						);
						msgCenter.add(msg);
					}
				}
			}
		});
		document.addEventListener('keyup', event => {
			for (let i = 0; i < keys.length; i++) {
				if (
					event.code === values[i] &&
					this.keyUp !== keys[i]
				) {
					this.keyUp = keys[i];
				}
			}
		});
		setTimeout(() => {
			this.lastKey = '';
		}, 100);
	}
}
