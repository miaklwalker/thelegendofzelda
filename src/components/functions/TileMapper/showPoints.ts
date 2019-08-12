import showGrid from "./showGrid.js";
import { shapes } from "./createTileMap.js";
import { sets } from "./Sets.js";

export function showPoints(context: CanvasRenderingContext2D) {
  showGrid(context);
  let colors = ["black", "red", "yellow", "green"];
  sets.forEach((set, index) => {
    let value: string;
    for (value of set) {
      context.fillStyle = colors[index];
      let cell: [number, number, number, number, number] = JSON.parse(value);
      context.beginPath();
      context.moveTo(
        shapes[cell[4]][0][0] + cell[0],
        shapes[cell[4]][0][1] + cell[1]
      );
      context.lineTo(
        shapes[cell[4]][1][0] + cell[0],
        shapes[cell[4]][1][1] + cell[1]
      );
      context.lineTo(
        shapes[cell[4]][2][0] + cell[0],
        shapes[cell[4]][2][1] + cell[1]
      );
      context.lineTo(
        shapes[cell[4]][3][0] + cell[0],
        shapes[cell[4]][3][1] + cell[1]
      );
      context.fill();
    }
  });
}
