import controlsConfig from "./controllerConfig";

export default class Controls {
      up: string;
      down: string;
      left: string;
      right: string;
      start:string;
      select:string;
      A:string;
      B:string;
      constructor(config:controlsConfig){
            this.up = config.up;
            this.down = config.down;
            this.left = config.left;
            this.right = config.right;
            this.start = config.start;
            this.select = config.select;
            this.A=config.A;
            this.B = config.B;

      }
      setupControls(){}
}