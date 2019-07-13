 const loadJson = async (url: string)=> await (await fetch(url)).json();
export default loadJson

