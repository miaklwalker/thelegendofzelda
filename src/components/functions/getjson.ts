export default async function loadJson(url: string) {
    let response = await (await fetch(url)).json();
    return response;
}
