import { allSets } from "./Sets.js";
export function eraseTiles() {
    allSets.forEach(set => { set.clear(); });
    navigator.clipboard.writeText("Cleared!");
}
//# sourceMappingURL=eraseTiles.js.map