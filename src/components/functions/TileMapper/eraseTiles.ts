import { allSets } from "./Sets.js";


export function eraseTiles() {
  console.log('Tiles Erased')
    allSets.forEach(set=>{
      console.log(set)
      set.clear()
    });
    navigator.clipboard.writeText("Cleared!");
  }