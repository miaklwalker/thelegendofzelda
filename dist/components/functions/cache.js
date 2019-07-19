/*
NOT MY CODE
From a memoization library
https://github.com/caiogondim/fast-memoize.js
*/
function memoize(fn, options) {
    var cache = options && options.cache ? options.cache : cacheDefault;
    var serializer = options && options.serializer
        ? options.serializer
        : serializerDefault;
    var strategy = options && options.strategy ? options.strategy : strategyDefault;
    return strategy(fn, {
        cache: cache,
        serializer: serializer,
    });
}
function isPrimitive(value) {
    return (value == null ||
        typeof value === 'number' ||
        typeof value === 'boolean'); // || typeof value === "string" 'unsafe' primitive for our needs
}
function monadic(fn, cache, serializer, arg) {
    var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        //@ts-ignore
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function variadic(fn, cache, serializer) {
    var args = Array.prototype.slice.call(arguments, 3);
    var cacheKey = serializer(args);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        //@ts-ignore
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
    return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
    var strategy = fn.length === 1 ? monadic : variadic;
    return assemble(fn, 
    //@ts-ignore
    this, 
    //@ts-ignore
    strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
    var strategy = variadic;
    return assemble(fn, 
    //@ts-ignore
    this, strategy, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
    var strategy = monadic;
    return assemble(fn, 
    //@ts-ignore
    this, 
    //@ts-ignore
    strategy, options.cache.create(), options.serializer);
}
function serializerDefault() {
    return JSON.stringify(arguments);
}
function ObjectWithoutPrototypeCache() {
    //@ts-ignore
    this.cache = Object.create(null);
}
ObjectWithoutPrototypeCache.prototype.has = function (key) {
    return key in this.cache;
};
ObjectWithoutPrototypeCache.prototype.get = function (key) {
    return this.cache[key];
};
ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
    this.cache[key] = value;
};
var cacheDefault = {
    create: function create() {
        //@ts-ignore
        return new ObjectWithoutPrototypeCache();
    },
};
export default memoize;
export const strategies = {
    variadic: strategyVariadic,
    monadic: strategyMonadic,
};
