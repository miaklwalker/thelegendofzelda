import { Vector } from "../math/vector.js";
import uniqueId from "../../functions/uniqueId.js";
import { actualX, actualY } from "../../functions/tileCorConvert.js";


export default class Sword {
  damage: number;
  position: Vector;
  direction: string;
  types: string[];
  type: number;
  name: string;
  id: string;
  constructor(damage: number, x: number, y: number, direction: string) {
    this.damage = damage;
    this.id = uniqueId();
    this.name = "sword";
    this.position = new Vector(x, y);
    this.direction = direction;
    this.types = ["wood", "white", "magic"];
    this.type = 0;
  }
  show() {
    let str = `${this.types[this.type]}-sword-${this.direction}`;
    return str;
  }
  placement(lx: number, ly: number, direction: string) {
    let directions: { [index: string]: number } = {
      right: 0,
      left: 1,
      up: 2,
      down: 3
    };
    let positionModifier = [
      new Vector(1, 0),
      new Vector(-1, 0),
      new Vector(0, -1),
      new Vector(0, 1)
    ];
    this.position = new Vector(lx, ly);
    this.position.add(positionModifier[directions[direction]]);

    let x = [25, -25, -8, 0];
    let y = [3, 3, -25, 25];
    let width = 30;
    let height = 30;

    let place: [number, number, number, number];

    place = [
      actualX(lx) + x[directions[direction]],
      actualY(ly) + y[directions[direction]],
      width,
      height
    ];

    return place;
  }
}
