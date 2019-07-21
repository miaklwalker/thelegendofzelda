import showGrid from "./showScreenGrid.js";
let points = new Set();
function createTileMap(context: CanvasRenderingContext2D) {
  showGrid(context);
  document.addEventListener("click", event => {
    points.add(event.clientX);
    console.log(points);
  });
}
export default createTileMap;
