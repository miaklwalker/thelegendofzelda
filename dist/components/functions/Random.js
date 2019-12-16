export default function random(min, max) {
    let random = Math.floor(Math.random() * max);
    let output = random < min ? min : random;
    return output;
}
//# sourceMappingURL=Random.js.map