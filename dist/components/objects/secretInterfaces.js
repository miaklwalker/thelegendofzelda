export let subtypes = {
    cave: {
        rupee: {},
        shop: {},
        heart: {},
        game: {},
        hint: {},
        sword: {},
    },
    secret: {
        rupee: {},
        shop: {},
        heart: {},
        game: {},
        hint: { test: "I Exist" },
    },
    dungeon: {
        dungeonOne: {},
        dungeonTwo: {},
        dungeonThree: {},
        dungeonFour: {},
        dungeonFive: {},
        dungeonSix: {},
        dungeonSeven: {},
        dungeonEight: {},
        dungeonNine: {},
    },
};
export let conditions = ['bombable', 'flute', 'burnable', 'fakeWall', 'pushable'].map(el => [el, el]);
//# sourceMappingURL=secretInterfaces.js.map