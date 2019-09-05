import { selectFactory } from "../makeSelect.js";
import { sets, setsString, SecretObject } from "./Sets.js";
import map from "./tileMap.js";
import { enemies } from "../../objects/enemies.js";
import { subtypes, conditions } from "../../objects/secretInterfaces.js";

let topleft = [[0, 0], [32, 0], [0, 34],[1,0]];
let topright = [[0, 0], [32, 0], [32, 32],[1,0]];
let botleft = [[0, 0], [32, 34], [0, 34],[1,0]];
let botright = [[32, 0], [32, 34], [0, 34],[31,0]];
let square = [[0, 0], [0, 34], [32, 34], [32, 0]];
let botHalf = [[0,34/2],[0,34],[32,34],[32,34/2]]
let topHalf = [[0,0],[0,34/2],[32,34/2],[32,0]]
let leftHalf = [[0,0],[0,34],[32/2,34],[32/2,0]]
let rightHalf = [[32/2,0],[32/2,34],[32,34],[32,0]]

export let shapes = [topleft, topright, botleft, botright, square,botHalf,topHalf,leftHalf,rightHalf];
let secretConditions = conditions
let enemiesTypes = Object.keys(enemies).map(key=>[key,key]);
let keys = Object.keys(subtypes).map(el=>[el,el])
let keySel = selectFactory('Types',keys)
function createTileMap() {
  let select3:HTMLSelectElement
  let select4:HTMLSelectElement
  let select5:HTMLSelectElement
  let shape = document.getElementById("Select") as HTMLSelectElement;
  let type = document.getElementById("type") as HTMLSelectElement;
  document.addEventListener("click", event => {
    let typeValue: string = type.value;
    let selection = keySel.value
    console.log(selection);
    let subkeys = selectFactory('subTypes',Object.keys(subtypes[selection]).map(el=>[el,el]))
    console.log(subkeys)
    let sType = document.getElementById('secretType')
    if(typeValue==='Secret'){
      if(sType===null){
      select3 = selectFactory('secretType',secretConditions)
      select4 = keySel
      select5 = subkeys
      document.body.appendChild(select4)
      document.body.appendChild(select5)
      document.body.appendChild(select3)
      }
    }else{
      if(sType!==null){
        let s3 = document.getElementById('secretType') as HTMLSelectElement
        let s4 = document.getElementById('Types') as HTMLSelectElement
        let s5 = document.getElementById('subTypes') as HTMLSelectElement
        document.body.removeChild(s5)
        document.body.removeChild(s3)
        document.body.removeChild(s4)
        }
    }
    let shapeCode: string = shape.value;
    let currentSet = sets[setsString.indexOf(typeValue)] as Set<any>;
    for (let i = 0; i < map.length; i++) {
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
