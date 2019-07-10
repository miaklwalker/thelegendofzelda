let map = new Map();
function cache(key, value) {
    if (map.has(key)) {
        return map.get(key);
    }
    else {
        map.set(key, value);
        return value;
    }
}
export default cache;
