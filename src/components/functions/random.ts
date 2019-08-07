export default function random (min:number , max:number){
    let random = Math.floor(Math.random()*max)
    let output = random < min ? min : random
    return output
}