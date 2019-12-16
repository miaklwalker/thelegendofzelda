/**
 *
 *
 * @returns
 */
function uniqueId() {
    let idString = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
    do {
        let ascicode = Math.floor(Math.random() * 42 + 48);
        if (ascicode < 58 || ascicode > 64) {
            idString += String.fromCharCode(ascicode);
        }
    } while (idString.length < 32);
    return idString;
}
export default uniqueId;
//# sourceMappingURL=uniqueId.js.map