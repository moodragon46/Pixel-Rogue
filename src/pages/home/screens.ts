import * as PIXI from 'pixi.js';
import * as builder from './builder';
import * as tiles from './tiles';

export let currentScreen : Screen = null;
export let scale : number = 0;

export class Screen {
    name : string;
    stage:PIXI.Container;

    constructor (public parentStage:PIXI.Container,public sizeX:number,public sizeY:number){
        this.stage = new PIXI.Container();
        
        parentStage.addChild(this.stage);
    }

    loop (dt:number){ }
    exit (){ }

    click (x:number,y:number){ }
};

export class Menu extends Screen {
    header : PIXI.Text;
    credit : PIXI.Text;
    clickToStart : PIXI.Text;
    
    constructor(parentStage:PIXI.Container,public sizeX:number,public sizeY:number){
        super(parentStage,sizeX,sizeY);

        this.name = "menu";
        this.header = new PIXI.Text("Pixel Rogue", {
            fill: [0xff0000,0xffff00],
            stroke: 0xffffff,
            strokeThickness: 2 * scale,
            fontSize: 70 * scale
        });
        this.header.anchor.set(0.5,0.5);
        this.header.position.set(this.sizeX/2,this.sizeY/2);
        
        this.stage.addChild(this.header);

        this.credit = new PIXI.Text("By Daniel and Connor", {
            fill: 0x09fafa,
            fontSize: 30 * scale
        });
        this.credit.anchor.set(0.5,0.5);
        this.credit.position.set(this.sizeX/2,this.sizeY*2/3);

        this.stage.addChild(this.credit);

        this.clickToStart = new PIXI.Text("Tap to start", {
            fill: 0x00ff00,
            fontSize: 30 * scale
        });
        this.clickToStart.anchor.set(0.5,0.5);
        this.clickToStart.position.set(this.sizeX/2,this.sizeY*5/6);

        this.stage.addChild(this.clickToStart);
    }


    click (x:number,y:number){
        loadScreen("game",currentScreen.parentStage,currentScreen.sizeX,currentScreen.sizeY);
    }
}

export class Game extends Screen {
    dungeon:tiles.Tile[][];
    mapLayer:PIXI.Container;

    constructor(parentStage:PIXI.Container,public sizeX:number,public sizeY:number){
        super(parentStage,sizeX,sizeY);

        this.name = "game";
        
        this.mapLayer = new PIXI.Container();
        this.dungeon = builder.genDungeon(this.mapLayer);
        
        this.mapLayer.scale.set(scale/2,scale/2);
        this.mapLayer.position.set(this.sizeX/2,this.sizeY/2);


        this.stage.addChild(this.mapLayer);
    }
}

export function loadScreen (name : string, stage : PIXI.Container, sizeX:number, sizeY:number){
    if(currentScreen!==null){
        stage.removeChild(currentScreen.stage);
        currentScreen.exit();
    }else {
        scale = window.innerHeight / 732;
    }

    switch(name){
        case "menu":
            currentScreen = new Menu(stage,sizeX,sizeY);
            break;
        case "game":
            currentScreen = new Game(stage,sizeX,sizeY);
            break;
        default:
            console.error("Unrecognised screen type: "+name);
            break;
    }
}

export function loopCurrent (dt:number){
    currentScreen.loop(dt);
}

export function click (x : number, y : number) {
    currentScreen.click(x,y);
}