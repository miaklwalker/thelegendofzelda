import { outSets } from "./Sets.js";

export function exportTiles() {
  let button = document.createElement("button");
  let tiles: any[] = [];
  let spawns: any[] = [];
  let secrets: any[] = [];
  let caves: any[] = [];
  let arrs: any[][] = [tiles, spawns, secrets, caves];
  button.innerText = "Export";
  document.body.appendChild(button);
  button.addEventListener("click", () => {
    outSets.forEach((set, index) => {
      let value: string;
      for (value of set) {
        let cell = JSON.parse(value);
        arrs[index].push([cell]);
      }
    });
    console.log(secrets)
    navigator.clipboard
      .writeText(
        `
      "hitboxes":[${tiles}],
      "enemies":[],
      "secrets":[${JSON.stringify(secrets)}],
      "caves":[${caves}],
      "spawnPoints":[${spawns}]
      `
      )
      .then(() => {
        console.log("copied");
      });
    arrs.forEach(arr=>arr.length=0)
  });
}
