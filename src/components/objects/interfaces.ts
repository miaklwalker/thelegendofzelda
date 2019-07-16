export interface TitleScreen {}

export interface Urls {
    dungeonTiles: string;
    enemyTiles: string;
    enemy: string;
    enemyTwo: string;
    enemyThree: string;
    link3: string;
    misc2: string;
    misc: string;
    npc: string;
    npc2: string;
    zelda: string;
    zelda2: string;
    hud: string;
    fileSelect: string;
    font: string;
    overworldTileset: string;
    overWorldTiles: string;
    title: string;
    overworld: string;
}

export interface Hud {
    top: [number, number, number, number, number, number, number, number];
    paused: [number, number, number, number, number, number, number, number];
    triforce: [number, number, number, number, number, number, number, number];
    inventory: [number, number, number, number, number, number, number, number];
}

export interface Bosses {}

export interface Enemies {}

export interface SpriteSheet {
    name: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface NPC {}

export interface Tiles {}

export interface Sprites {
    Bosses: Bosses;
    Enemies: Enemies;
    Link: SpriteSheet[];
    NPC: NPC;
    Tiles: Tiles;
}

export default interface RootObject {
    TitleScreen: TitleScreen;
    urls: Urls;
    hud: Hud;
    Sprites: Sprites;
}
