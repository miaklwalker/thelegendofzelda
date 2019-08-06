export default interface RootObject {
    TitleScreen: BossesOrEnemiesOrNPCOrTilesOrTitleScreen;
    urls: Urls;
    hud: Hud;
    Sprites: Sprites;
    tileMap: TileMap;
  }
  export interface gameScreen{
    hitBoxes: number[][];
    enemies: string[];
    secrets: [{ location: number[]; type: string }];
    caves: [],
    spawnPoints:number[];
  }
  
  export interface BossesOrEnemiesOrNPCOrTilesOrTitleScreen {
  }
  export interface Urls {
    dungeonTiles: string;
    enemyTiles: string;
    enemy: string;
    enemyTwo: string;
    enemyThree: string;
    link: string;
    misc2: string;
    misc: string;
    npc: string;
    npc2: string;
    zelda2: string;
    hud: string;
    fileSelect: string;
    font: string;
    overworldTileset: string;
    overWorldTiles: string;
    title: string;
    overworld: string;
    dungeonOne: string;
  }
  export interface Hud {
    top:       [number,number,number,number,number,number,number,number] ;
    paused:    [number,number,number,number,number,number,number,number] ;
    triforce:  [number,number,number,number,number,number,number,number] ;
    inventory: [number,number,number,number,number,number,number,number] ;
  }
  export interface Sprites {
    [index:string]:any
    Bosses: BossesOrEnemiesOrNPCOrTilesOrTitleScreen;
    Enemies: BossesOrEnemiesOrNPCOrTilesOrTitleScreen;
    link?: (LinkEntity)[] | null;
    NPC: BossesOrEnemiesOrNPCOrTilesOrTitleScreen;
    Tiles: BossesOrEnemiesOrNPCOrTilesOrTitleScreen;
  }
  export interface LinkEntity {
    name: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }
  export interface TileMap {
    [index:string]:number[]
  }
  
