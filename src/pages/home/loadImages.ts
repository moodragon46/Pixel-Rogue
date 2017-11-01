import * as PIXI from 'pixi.js';

export function loadImages (onload : ()=>void){
    PIXI.loader
        .add("./assets/imgs/dirt.jpg")
        .add("./assets/imgs/wall.jpg")
        .load(onload);
}