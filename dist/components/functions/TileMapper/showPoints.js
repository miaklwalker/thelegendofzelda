import showGrid from "./showGrid.js";
import { shapes } from "./createTileMap.js";
import { sets } from "./Sets.js";
export function showPoints(context) {
    showGrid(context);
    let colors = ["black", "red", "yellow", "green"];
    sets.forEach((set, index) => {
        let value;
        for (value of set) {
            context.fillStyle = colors[index];
            let cell = JSON.parse(value);
            context.beginPath();
            context.moveTo(shapes[cell[4]][0][0] + cell[0], shapes[cell[4]][0][1] + cell[1]);
            context.lineTo(shapes[cell[4]][1][0] + cell[0], shapes[cell[4]][1][1] + cell[1]);
            context.lineTo(shapes[cell[4]][2][0] + cell[0], shapes[cell[4]][2][1] + cell[1]);
            context.lineTo(shapes[cell[4]][3][0] + cell[0], shapes[cell[4]][3][1] + cell[1]);
            context.fill();
        }
    });
}
//# sourceMappingURL=showPoints.js.map