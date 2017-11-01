import * as tiles from './tiles';
import * as PIXI from 'pixi.js';

export const width = 64;
export const height = 64;

export function genDungeon (stage:PIXI.Container) : tiles.Tile[][] {
    const dungeon : tiles.Tile[][] = [];

    for(let x=0;x<width;x++){
        if(!dungeon[x]){
            dungeon[x] = [];
        }
        for(let y=0;y<height;y++){
            const tileX = x-width/2;
            const tileY = y-height/2;
            dungeon[x][y] = (x%2===1&&y%2===1)
                ?(new tiles.Wall(stage,tileX,tileY))
                :(new tiles.Dirt(stage,tileX,tileY));
        }
    }

    return dungeon;
}