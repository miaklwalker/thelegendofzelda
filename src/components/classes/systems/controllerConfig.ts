export default class controlsConfig {
      up: string;
      down: string;
      left:string
      right:string
      start:string
      select:string
      A:string
      B:string
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
