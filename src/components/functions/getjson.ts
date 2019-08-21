 /**
  * @function loadJson
  * @description Takes a url string and returns a fetch promise
  * @param {string} url
  */

const loadJson = async (url: string)=> await (await fetch(url)).json();

export default loadJson

