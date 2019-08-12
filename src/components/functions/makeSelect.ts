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
    let option5 = document.createElement('option');
    option5.innerText = 'Bottom Half';
    option5.value = '5';
    let option6 = document.createElement('option');
    option6.innerText = 'Top Half';
    option6.value = '6';
    let option7 = document.createElement('option');
    option7.innerText = 'Left Half';
    option7.value = '7';
    let option8 = document.createElement('option');
    option8.innerText = 'Right Half';
    option8.value = '8';
    select.append(option4);
    select.append(option0);
    select.append(option1);
    select.append(option2);
    select.append(option3);
    select.append(option5);
    select.append(option6);
    select.append(option7);
    select.append(option8);

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