export default function teleporter(id:string){
    let input = document.createElement('input');
    input.id = id
    input.type = 'text'
    input.value='0'
    input.style.width = '15px'
    return input
}

