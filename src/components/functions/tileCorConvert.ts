const tileWidth = 32;
const tileHeight = 34;
const hudOffset = 120;
export const actualX = (x: number) => x * tileWidth;
export const actualY = (y: number) => y * tileHeight + hudOffset;