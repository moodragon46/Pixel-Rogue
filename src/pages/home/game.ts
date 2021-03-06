import * as PIXI from 'pixi.js';
import {initEvents} from './events';
import {loadImages} from './loadImages';
import {generateFeatures} from './mapGen/dungeonFeatures';

import * as screens from './screens';

export class Game {
    app : PIXI.Application;
    width : number;
    height : number;
    constructor(){
        generateFeatures();

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        // Disable loading element
        document.getElementById("loading").style.display = "none";

        this.app = new PIXI.Application(window.innerWidth,window.innerHeight,{backgroundColor:0x000000});
        document.body.appendChild(this.app.view);
        initEvents(this.app.view);

        this.width = this.app.renderer.width;
        this.height = this.app.renderer.height;

        loadImages(()=>{
            screens.loadScreen("menu",this.app.stage,this.width,this.height);

            this.app.ticker.add((dt:number)=>{
                screens.loopCurrent(dt);
            });
        });
    }
}