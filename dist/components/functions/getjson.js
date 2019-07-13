const loadJson = async (url) => await (await fetch(url)).json();
export default loadJson;
