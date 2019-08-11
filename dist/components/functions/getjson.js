/**
 *
 *
 * @param {string} url
 */
const loadJson = async (url) => await (await fetch(url)).json();
export default loadJson;
//# sourceMappingURL=GetJson.js.map