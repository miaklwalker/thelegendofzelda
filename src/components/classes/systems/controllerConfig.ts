export default class controlsConfig {
	up: string;
	down: string;
	left: string;
	right: string;
	start: string;
	select: string;
	A: string;
	B: string;
	/**
	 *Creates an instance of controlsConfig.
	 * @param {string} up
	 * @param {string} down
	 * @param {string} left
	 * @param {string} right
	 * @param {string} start
	 * @param {string} select
	 * @param {string} A
	 * @param {string} B
	 * @memberof controlsConfig
	 */
	constructor(
		up: string,
		down: string,
		left: string,
		right: string,
		start: string,
		select: string,
		A: string,
		B: string,
	) {
		this.up = up;
		this.down = down;
		this.left = left;
		this.right = right;
		this.start = start;
		this.select = select;
		this.A = A;
		this.B = B;
	}
}
