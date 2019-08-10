export let enemyIndex: {
  [index:string]:number
  octo: number;
  blueOcto: number;
  moblin: number;
  blueMoblin: number;
  lynel: number;
  blueLynel: number;
  boulder:number;
} = {
  octo: 0,
  blueOcto: 1,
  moblin: 2,
  blueMoblin: 3,
  lynel: 4,
  blueLynel: 5,
  tektite:6,
  blueTektite:7,
  boulder:8,
  armos:9,

};

export let enemies: {
  name: string;
  x: number;
  y: number;
  behaviors: string[];
  health: number;
  color: string;
  damage:number
}[] = [
  {
    name: "octo",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 0.5,
    color: "red",
    damage:.5
  },
  {
    name: "octo",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 1,
    color: "blue",
    damage:.5
  },
  {
    name: "moblin",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 2,
    color: "red",
    damage:.5
  },
  {
    name: "moblin",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 3,
    color: "blue",
    damage:.5
  },
  {
    name: "lynel",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 4,
    color: "red",
    damage:2
  },
  {
    name: "lynel",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["walk", "stop", "shoot"],
    health: 6,
    color: "blue",
    damage:2
  },
  {
    name: "tektite",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["jump", "stop"],
    health: 0.5,
    color: "red",
    damage:.5
  },
  {
    name: "tektite",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["jump", "stop"],
    health: 0.5,
    color: "blue",
    damage:.5
  },
  {
    name: "boulder",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["fall"],
    health: 0.5,
    color: "red",
    damage:.5
  },
  {
    name: "armos",
    x: Math.floor(Math.random() * 14),
    y: Math.floor(Math.random() * 8),
    behaviors: ["fall"],
    health: 3,
    color: "red",
    damage:1
  },
];
