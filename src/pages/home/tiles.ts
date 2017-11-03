import * as PIXI from 'pixi.js';
import * as builder from './builder';

export class Tile extends PIXI.Sprite {
    walkable : boolean;

    constructor(stage:PIXI.Container,public tileX:number,public tileY:number,imageName:string){
        super(PIXI.utils.TextureCache["./assets/imgs/"+imageName]);

        this.move(this.tileX,this.tileY);
        this.walkable = false;

        stage.addChild(this);
    }

    move(newX:number,newY:number){
        this.tileX = newX;
        this.tileY = newY;
        this.position.set(newX*16-8 - 8*builder.width,newY*16-8 - 8*builder.height);
    }
}

export class Dirt extends Tile {
    constructor(stage:PIXI.Container,tileX:number,tileY:number){
        super(stage,tileX,tileY,"dirt.jpg");

        this.walkable = true;
    }
}

export class Wall extends Tile {
    constructor(stage:PIXI.Container,tileX:number,tileY:number){
        super(stage,tileX,tileY,"wall.jpg");
    }
}