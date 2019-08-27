import { Result } from "../Collisions/Collisions.js";
import enemy from "../classes/actors/Enemy.js";
import Sword from "../classes/actors/Sword.js";
import Link from "../classes/actors/link.js";
import { direction } from "./directionMessage.js";
import Message from "../classes/systems/message.js";
import { Vector } from "../classes/math/vector.js";
import MessageQueue from "../classes/systems/messageQueue.js";

let collisionBehavior = (result:Result,player:any)=>{
  let divisor = new Vector(32,34)
  const { overlap, overlap_x, overlap_y } = result;
  let cX = overlap_x * overlap;
  let cY = overlap_y * overlap;
  let correctionForce = new Vector(cX, cY);
  correctionForce.div(divisor);
  player.position.subtractX(correctionForce);
}

let swordCollision = (sword: Sword, other: enemy, result: Result) => {
  if (other instanceof enemy) {
    const { a, b, overlap, overlap_x, overlap_y } = result;
    let cX = overlap_x * overlap;
    let cY = overlap_y * overlap;
    let correctionForce = new Vector(cX, cY);
    correctionForce.div(24);
    other.health -= sword.damage;
    if (result.overlap_x > 0) {
      other.position.addX(correctionForce);
      return;
    }
    if (result.overlap_x < 0) {
      other.position.subtractX(correctionForce);
      return;
    }
    if (result.overlap_y > 0) {
      other.position.addY(correctionForce);
      return;
    }
    if (result.overlap_y < 0) {
      other.position.subtractY(correctionForce);
      return;
    }
  }
};

let boulderCollision=(boulder: enemy, player: Link, result: Result)=> {
  let all = [boulder,player].every(el=>el.name==='boulder');
  if(!all){

  }
  }

let linkCollision = (link: Link, other: any, result: Result) => {
  if(other instanceof enemy){
    link.hurt[1]=60
    if(!link.hurt[0]){
    link.health -= other.damage
    }
  }else{
   collisionBehavior(result,link);
  }
};

let colliders = [swordCollision, boulderCollision, linkCollision];
let names = ["sword", "boulder", "link"];

function collisionParser(result: Result, messageCenter: MessageQueue) {
  const { a, b, overlap, overlap_x, overlap_y } = result;
  if (a.sprite !== undefined && b.sprite !== undefined) {
    let resultIncludes = (name: string) =>
      [a.sprite.name, b.sprite.name].includes(name);
    for (let index = 0; index < names.length; index++) {
      if (resultIncludes(names[index])) {
        let main = names[index] === a.sprite.name ? a.sprite : b.sprite;
        let other = main === a.sprite ? b.sprite : a.sprite;
        colliders[index](main, other, result);
      }
    }
  } else if(a.sprite === undefined || b.sprite === undefined) {
    let arr = [a.sprite,b.sprite].filter(el=>el!==undefined)
    if(arr[0].name!=='boulder'){
    messageCenter.add(new Message(...direction(result)));
    let cX = overlap_x * overlap;
    let cY = overlap_y * overlap;
    let correctionForce = new Vector(cX, cY);
    correctionForce.div(24);
    a.sprite.position.subtract(correctionForce);
    }
  }
}

export default collisionParser;
