export let enemies = [
  {
    name: "octo",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 0.5,
    color: "red"
  },
  {
    name: "octo",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 1,
    color: "blue"
  },
  {
    name: "moblin",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 2,
    color: "red"
  },
  {
    name: "moblin",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 3,
    color: "blue"
  },
  {
    name: "lynel",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 4,
    color: "red"
  },
  {
    name: "lynel",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 6,
    color: "blue"
  }
];
