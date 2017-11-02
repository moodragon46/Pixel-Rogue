export function int(min:number,max:number){
    return min + Math.floor(Math.random()*(max-min));
}

export function choice(options:any[]){
    return options[int(0,options.length)];
}