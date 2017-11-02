import * as tiles from './tiles';
import * as PIXI from 'pixi.js';

import {cachedFeatures} from './mapGen/dungeonFeatures';

export const width = 64;
export const height = 64;

export function genDungeon (stage:PIXI.Container) : tiles.Tile[][] {

    const stringDungeon : string[][] = [];
    for(let i=0;i<height;i++){
        stringDungeon.push([]);
        for(let j=0;j<width;j++){
            stringDungeon[i][j] = (i===0||i+1===height||j===0||j+1===width)?"#":" ";
        }
    }


    // Generate dungeon from stringmap
    const dungeon : tiles.Tile[][] = [];

    for(let i=0;i<stringDungeon.length;i++){
        for(let j=0;j<stringDungeon[i].length;j++){
            if(!dungeon[j]){
                dungeon[j] = [];
            }
            switch(stringDungeon[i][j]){
                case "#":
                    //Wall
                    //Important! using [j][i] instead of [i][j] because string maps operate [y][x] whereas dungeon maps operate [x][y]
                    dungeon[j][i] = new tiles.Wall(stage,j,i);
                    break;
                default:
                    // Anything else is floor
                    dungeon[j][i] = new tiles.Dirt(stage,j,i);
                    break;
            }
        }
    }

    return dungeon;
}