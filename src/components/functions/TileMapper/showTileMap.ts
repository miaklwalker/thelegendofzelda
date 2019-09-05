import { shapes } from "./createTileMap.js";

export function showTileMap(
    tilemap: [[number, number, number, number, number]],
    context: CanvasRenderingContext2D
  ) {
    if (tilemap !== undefined) {
      for (let tile = 0; tile < tilemap.length; tile++) {
        context.beginPath();
        context.moveTo(
          shapes[tilemap[tile][4]][0][0] + tilemap[tile][0],
          shapes[tilemap[tile][4]][0][1] + tilemap[tile][1]
        );
        context.lineTo(
          shapes[tilemap[tile][4]][1][0] + tilemap[tile][0],
          shapes[tilemap[tile][4]][1][1] + tilemap[tile][1]
        );
        context.lineTo(
          shapes[tilemap[tile][4]][2][0] + tilemap[tile][0],
          shapes[tilemap[tile][4]][2][1] + tilemap[tile][1]
        );
        context.lineTo(
          shapes[tilemap[tile][4]][3][0] + tilemap[tile][0],
          shapes[tilemap[tile][4]][3][1] + tilemap[tile][1]
        );
        context.fill();
      }
    }
  }