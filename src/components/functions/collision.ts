import Link from "../classes/actors/link";
import { Vector } from "../classes/math/vector.js";

const collision = (Actor: Link,tileMap:[[number,number,number,number]]) => {
  const { x, y } = Actor.position;
  let up, down, left, right, upLeft, upRight, downLeft, downRight
  up = new Vector(x, y-1);
  down = new Vector(x, y+1);
  left = new Vector(x-1, y);
  right = new Vector(x+1, y);
  upLeft = new Vector(x-1, y-1);
  upRight = new Vector(x+1, y-1);
  downLeft = new Vector(x-1, y+1);
  downRight = new Vector(x+1, y+1);
  let arr:Vector[] = [up, down, left, right, upLeft, upRight, downLeft, downRight];
 let hitVector=tileMap.map(tile=>{
   let x = Math.round(tile[0]/32)
   let y = Math.round(tile[1]/34)
   return new Vector(x,y)
 })
  //-------------------------------
for(let i = 0 ; i <  arr.length ; i++){
  for (let j = 0 ; j < hitVector.length ; j++){
    if(arr[i].same(hitVector[j])){
      console.log('Hit!')
    }else{
      if(arr[i].distance(hitVector[j])<1){
        console.log(arr[i].distance(hitVector[j]))
      }
    }
  }
}

};
//     this.images[5].renderSprite(context, link, [x * 32,y * 34 + 120, 30,30,]);
export default collision