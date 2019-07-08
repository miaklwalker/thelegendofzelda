export default class Game {
    width: number;
    height: number;
    constructor(width: number, height: number);
    makeGameScreen(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void;
    startScreen(context: CanvasRenderingContext2D): void;
}
