let map = new Map();
/**
 *
 *
 * @param {*} key
 * @param {*} value
 * @returns
 */
function cache(key:any,value:any){
if(map.has(key)){
   return map.get(key);
}else{
    map.set(key,value);
    return value
}
}

export default cache