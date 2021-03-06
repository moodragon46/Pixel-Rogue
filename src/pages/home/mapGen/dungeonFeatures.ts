import {features} from './dungeonFeaturesRaw';

let cachedFeaturesNonLinked:Array<Array<Array<string>>> = [];
export let cachedFeatures:Array<Feature> = [];

class Feature {
    leftLinks:Array<Array<number>>;
    rightLinks:Array<Array<number>>;
    upLinks:Array<Array<number>>;
    downLinks:Array<Array<number>>;

    constructor (public stringMap:Array<Array<string>>){
        this.generateLinks();
    }

    generateLinks(){
        this.upLinks = [];
        this.downLinks = [];
        this.leftLinks = [];
        this.rightLinks = [];

        for(let y=0;y<this.stringMap.length;y++){
            for(let x=0;x<this.stringMap[y].length;x++){
                switch(this.stringMap[y][x]){
                    case "U":
                        this.upLinks.push([x,y]);
                        break;
                    case "D":
                        this.downLinks.push([x,y]);
                        break;
                    case "L":
                        this.leftLinks.push([x,y]);
                        break;
                    case "R":
                        this.rightLinks.push([x,y]);
                        break;
                }
            }
        }
    }
}

export function generateFeatures () {
    //reset
    cachedFeatures = [];
    cachedFeaturesNonLinked = [];

    let currentFeature:Array<Array<string>> = [[]];
    for(let i=0;i<features.length;i++){
        if(features[i]==="\n"){
            currentFeature.push([]);
        }else if(features[i]==="N"){
            //Next feature
            cachedFeaturesNonLinked.push(currentFeature.concat([]));
            currentFeature = [[]];
        }else {
            currentFeature[currentFeature.length-1].push(features[i]);
        }
    }
    // Push final one
    cachedFeaturesNonLinked.push(currentFeature.concat([]));

    //Now add all rotations of the features to the cachedFeaturesNonLinked
    const originalFeatures = cachedFeaturesNonLinked.concat([]);

    for(let i=0;i<originalFeatures.length;i++){
        // Assuming the original was up
        const right = rotateRight(originalFeatures[i]);
        const down = rotateRight(right);
        const left = rotateRight(down);

        cachedFeaturesNonLinked.push(right,down,left);
    }

    // Save
    for(let i=0;i<cachedFeaturesNonLinked.length;i++){
        cachedFeatures.push(new Feature(cachedFeaturesNonLinked[i]));
    }

    // Finished !
}


// ---------- String rotating utils
function rotateRight(map:Array<Array<string>>) : Array<Array<string>> {
    const newMap = [];

    let width = 0;
    for(let i=0;i<map.length;i++){
        if(map[i].length>width){
            width = map[i].length;
        }
    }

    const cX = Math.ceil(width/2);
    const cY = Math.ceil(map.length/2);

    let lowestX = 9999;
    let lowestY = 9999;

    for(let y=0;y<map.length;y++){
        for(let x=0;x<width;x++){
            const diffX = x-cX;
            const diffY = y-cY;

            const newX = cX-diffY;
            const newY = cY+diffX;

            if(!newMap[newY]){
                newMap[newY] = [];
            }
            newMap[newY][newX] = map[y][x];

            if(newX<lowestX){
                lowestX = newX;
            }
            if(newY<lowestY){
                lowestY = newY;
            }
        }
    }

    const finalUnswitched = snip(newMap,lowestX,lowestY);
    const final = finalUnswitched.concat([]);
    for(let i=0;i<finalUnswitched.length;i++){
        for(let j=0;j<width;j++){
            switch(finalUnswitched[i][j]){
                case "L":
                    final[i][j] = "U";
                    break;
                case "U":
                    final[i][j] = "R";
                    break;
                case "R":
                    final[i][j] = "D";
                    break;
                case "D":
                    final[i][j] = "L";
                    break;
            }
        }
    }

    return final;
}

function snip(map : Array<Array<string>>, minX : number, minY : number) : Array<Array<string>> {
    if(minX!==0){
        const push = -minX;
        
        const correctedMap = [];
        for(let y in map){
            for(let x in map[y]){
                if(!correctedMap[y]){
                    correctedMap[y] = [];
                }
                correctedMap[y][parseInt(x)+push] = map[y][parseInt(x)];
            }
        }

        map = correctedMap;
    }

    if(minY!==0){
        const push = -minY;
        
        const correctedMap = [];
        for(let y in map){
            for(let x in map[y]){
                if(!correctedMap[parseInt(y)+push]){
                    correctedMap[parseInt(y)+push] = [];
                }
                correctedMap[parseInt(y)+push][x] = map[parseInt(y)][x];
            }
        }

        map = correctedMap;
    }

    return map;
}
