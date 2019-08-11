 function makeSelect(){
    let select = document.createElement('select');
    let option0 = document.createElement('option');
    option0.innerText = 'Top Left';
    option0.value = '0';
    let option1 = document.createElement('option');
    option1.innerText = 'Top Right';
    option1.value = '1';
    let option2 = document.createElement('option');
    option2.innerText = 'Bottom Left';
    option2.value = '2';
    let option3 = document.createElement('option');
    option3.innerText = 'Bottom Right';
    option3.value = '3';
    let option4 = document.createElement('option');
    option4.innerText = 'Square';
    option4.value = '4';
    select.append(option4);
    select.append(option0);
    select.append(option1);
    select.append(option2);
    select.append(option3);
    return select
}
export default makeSelect
/**
 * 
 * @param id 
 * @param options options is a InnerText / Value Pair in nested Arrays
 */
export function selectFactory(id:string,options:string[][]){
    let select = document.createElement('select');
    select.id = id
    options.forEach(option=>{
        let choice = document.createElement('option');
        choice.innerText = option[0]
        choice.value = option[1]
        select.append(choice)
    })
    return select
}