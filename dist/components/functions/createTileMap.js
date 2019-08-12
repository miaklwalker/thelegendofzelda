import { selectFactory } from "./makeSelect.js";
import { sets, setsString } from "./Sets.js";
import map from "./tileMap.js";
let topleft = [[0, 0], [32, 0], [0, 34], [0, 0]];
let topright = [[0, 0], [32, 0], [32, 32], [0, 0]];
let botleft = [[0, 0], [32, 34], [0, 34], [0, 0]];
let botright = [[32, 0], [32, 34], [0, 34], [32, 0]];
let square = [[0, 0], [0, 34], [32, 34], [32, 0]];
export let shapes = [topleft, topright, botleft, botright, square];
function createTileMap() {
    let select3;
    let shape = document.getElementById("Select");
    let type = document.getElementById("type");
    let secretTypes = [['Bombable', 'bombable'], ['Burnable', 'burnable'], ['Flute', 'flute'], ['Pushable', 'pushable']];
    document.addEventListener("click", event => {
        let typeValue = type.value;
        if (typeValue === 'Secret') {
            if (document.getElementById('secretType') === null) {
                select3 = selectFactory('secretType', secretTypes);
                document.body.appendChild(select3);
            }
        }
        else {
            if (document.getElementById('secretType') !== null) {
                let s3 = document.getElementById('secretType');
                document.body.removeChild(s3);
            }
        }
        let shapeCode = shape.value;
        let currentSet = sets[setsString.indexOf(typeValue)];
        for (let i = 0; i < map.length; i++) {
            if (event.clientX >= map[i][0] && event.clientX <= map[i][2] && event.clientY >= map[i][1] && event.clientY <= map[i][3]) {
                if (currentSet.has(JSON.stringify([map[i][0], map[i][1], 32, 34, shapeCode]))) {
                    currentSet.delete(JSON.stringify([map[i][0], map[i][1], 32, 34, shapeCode]));
                }
                else {
                    currentSet.add(JSON.stringify([map[i][0], map[i][1], 32, 34, shapeCode]));
                }
            }
        }
    });
}
export default createTileMap;
//# sourceMappingURL=createTileMap.js.map