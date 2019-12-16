export default function teleporter(id, max) {
    let input = document.createElement('input');
    input.id = id;
    input.type = 'number';
    input.min = '0';
    input.max = max;
    input.value = '0';
    input.step = '1';
    input.autocomplete = 'anyrandomstring';
    input.style.width = '40px';
    return input;
}
//# sourceMappingURL=Teleporter.js.map