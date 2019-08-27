import { Result } from "../Collisions/Collisions";
export let wallHit:[boolean,boolean,boolean,boolean]= [false,false,false,false]
export let reset = () =>{
    wallHit= [false,false,false,false]
}
export const direction:(results: Result) => [string,string,string,string] =(results:Result)=>{
    const {a,b,}=results
    const to = a.sprite.name;
    const from = "collisions";
    const type = a.sprite.id;
    let data = 'none';
    let forLink = to === 'link'
    if(forLink){
    wallHit = [false,false,false,false]
    }
    if (results.overlap_x > 0) {
        data = "right";
        if(forLink){wallHit[0]=true}
    }
    if (results.overlap_x < 0) {
        data = "left";
        if(forLink){wallHit[1]=true}
    }
    if (results.overlap_y > 0) {
        data = "down";
        if(forLink){wallHit[2]=true}
    }
    if (results.overlap_y < 0) {
        data = "up";
        if(forLink){wallHit[3]=true}
    }
    return [to,from,type,data]
  } 