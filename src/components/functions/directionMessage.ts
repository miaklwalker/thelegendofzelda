import { Result } from "../Collisions/Collisions";

export const direction:(results: Result) => [string,string,string,string] =(results:Result)=>{
    const {a,b,}=results
    const to = a.sprite.name;
    const from = "collisions";
    const type = a.sprite.id;
    let data = 'none';
    if (results.overlap_x > 0) {
        data = "right";
    }
    if (results.overlap_x < 0) {
        data = "left";
    }
    if (results.overlap_y > 0) {
        data = "down";
    }
    if (results.overlap_y < 0) {
        data = "up";
    }
    return [to,from,type,data]
  } 