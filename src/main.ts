


import { Action } from './action';

let add = (a:number, b:number) => a + b;
var a = new Action(add);

let aTick = a.map((t) => t);

let result = aTick.ap(12, 13); 
console.log(result); 