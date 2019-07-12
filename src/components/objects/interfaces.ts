

    export interface TitleScreen {
    }

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
        top: number[];
        paused: number[];
        triforce: number[];
        items: number[];
    }

    export interface RootObject {
        TitleScreen: TitleScreen;
        urls: Urls;
        hud: Hud;
    }

