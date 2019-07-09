export default async function loadJson(url: string) {
    let response = await (await fetch(url,{mode: 'no-cors'})).json();
    return response;
}
