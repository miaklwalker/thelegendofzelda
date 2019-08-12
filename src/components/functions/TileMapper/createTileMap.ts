import { selectFactory } from "../makeSelect.js";
import { sets, setsString, SecretObject } from "./Sets.js";
import map from "./tileMap.js";

let topleft = [[0, 0], [32, 0], [0, 34], [0, 0]];
let topright = [[0, 0], [32, 0], [32, 32], [0, 0]];
let botleft = [[0, 0], [32, 34], [0, 34], [0, 0]];
let botright = [[32, 0], [32, 34], [0, 34], [32, 0]];
let square = [[0, 0], [0, 34], [32, 34], [32, 0]];
export let shapes = [topleft, topright, botleft, botright, square];
let secretTypes = [['Bombable','bombable'],['Burnable','burnable'],['Flute','flute'],['Pushable','pushable']]

function createTileMap() {
  let select3:HTMLSelectElement
  let shape = document.getElementById("Select") as HTMLSelectElement;
  let type = document.getElementById("type") as HTMLSelectElement;

  document.addEventListener("click", event => {
    let typeValue: string = type.value;
    if(typeValue==='Secret'){
      if(document.getElementById('secretType')===null){
      select3 = selectFactory('secretType',secretTypes)
      document.body.appendChild(select3)
      }
    }else{
      if(document.getElementById('secretType')!==null){
        let s3 = document.getElementById('secretType') as HTMLSelectElement
        document.body.removeChild(s3)

        }
    }
    let shapeCode: string = shape.value;
    let currentSet = sets[setsString.indexOf(typeValue)] as Set<any>;
    for (let i = 0; i < map.length; i++) {
      console.log(event.clientX,event.clientY)
      if (event.clientX >= map[i][0] &&event.clientX <= map[i][2] &&event.clientY >= map[i][1] &&event.clientY <= map[i][3]
      ) {
        let secret
        if (currentSet.has(JSON.stringify([map[i][0], map[i][1], 32, 34, shapeCode]))) {
          if(typeValue==='Secret'){
          secret = {location:[map[i][0], map[i][1], 32, 34, shapeCode],type:select3.value}
          JSON.stringify(secret)

          SecretObject.delete(JSON.stringify(secret))
          }
          currentSet.delete(JSON.stringify([map[i][0], map[i][1], 32, 34, shapeCode]));
        } else {
          if(typeValue==='Secret'){
          secret = {location:[map[i][0], map[i][1], 32, 34, shapeCode],type:select3.value}
          secret.toString()
          SecretObject.add(JSON.stringify(secret))
          }
          currentSet.add(JSON.stringify([map[i][0], map[i][1], 32, 34, shapeCode]));
        }
      }
    }
  });
}

export default createTileMap;
