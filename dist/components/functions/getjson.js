export default async function loadJson(url) {
    let response = await (await fetch(url)).json();
    return response;
}
//# sourceMappingURL=getjson.js.map