export let enemyIndex = {
    octo: 0,
    blueOcto: 1,
    moblin: 2,
    blueMoblin: 3,
    lynel: 4,
    blueLynel: 5
};
export let enemies = [
    {
        name: "octo",
        x: Math.floor(Math.random() * 14),
        y: Math.floor(Math.random() * 8),
        behaviors: ["walk", "stop", "shoot"],
        health: 0.5,
        color: "red",
        damage: .5
    },
    {
        name: "octo",
        x: Math.floor(Math.random() * 14),
        y: Math.floor(Math.random() * 8),
        behaviors: ["walk", "stop", "shoot"],
        health: 1,
        color: "blue",
        damage: .5
    },
    {
        name: "moblin",
        x: Math.floor(Math.random() * 14),
        y: Math.floor(Math.random() * 8),
        behaviors: ["walk", "stop", "shoot"],
        health: 2,
        color: "red",
        damage: .5
    },
    {
        name: "moblin",
        x: Math.floor(Math.random() * 14),
        y: Math.floor(Math.random() * 8),
        behaviors: ["walk", "stop", "shoot"],
        health: 3,
        color: "blue",
        damage: .5
    },
    {
        name: "lynel",
        x: Math.floor(Math.random() * 14),
        y: Math.floor(Math.random() * 8),
        behaviors: ["walk", "stop", "shoot"],
        health: 4,
        color: "red",
        damage: 2
    },
    {
        name: "lynel",
        x: Math.floor(Math.random() * 14),
        y: Math.floor(Math.random() * 8),
        behaviors: ["walk", "stop", "shoot"],
        health: 6,
        color: "blue",
        damage: 2
    }
];
//# sourceMappingURL=enemies.js.map