import * as PIXI from 'pixi.js';

import * as screens from './screens';

export class Game {
    app : PIXI.Application;
    width : number;
    height : number;
    constructor(){
        this.app = new PIXI.Application(window.innerWidth,window.innerHeight,{backgroundColor:0x000000});
        document.body.appendChild(this.app.view);

        this.width = this.app.renderer.width;
        this.height = this.app.renderer.height;

        screens.loadScreen("menu",this.app.stage,this.width,this.height);

        this.app.ticker.add((dt:number)=>{
            screens.loopCurrent(dt);
        });
    }
}