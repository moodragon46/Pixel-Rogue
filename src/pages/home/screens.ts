import * as PIXI from 'pixi.js';

export let currentScreen : Screen = null;

export class Screen {
    stage:PIXI.Container;

    constructor (parentStage:PIXI.Container,public sizeX:number,public sizeY:number){
        this.stage = new PIXI.Container();
        
        parentStage.addChild(this.stage);
    }

    loop (dt:number){ }
    exit (){ }
};

export class Menu extends Screen {
    header : PIXI.Text;
    
    constructor(parentStage:PIXI.Container,public sizeX:number,public sizeY:number){
        super(parentStage,sizeX,sizeY);

        this.header = new PIXI.Text("Pixel Rogue", {
            fill: 0xffffff
        });
        this.header.anchor.set(0.5,0.5);
        this.header.position.set(this.sizeX/2,this.sizeY/2);
        
        this.stage.addChild(this.header);
    }
}

export function loadScreen (name : string, stage : PIXI.Container, sizeX:number, sizeY:number){
    if(currentScreen!==null){
        stage.removeChild(currentScreen.stage);
        currentScreen.exit();
    }

    switch(name){
        case "menu":
            currentScreen = new Menu(stage,sizeX,sizeY);
            break;
        default:
            console.error("Unrecognised screen type: "+name);
            break;
    }
}

export function loopCurrent (dt:number){
    currentScreen.loop(dt);
}