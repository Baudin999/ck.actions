


import { Action } from './action';

let add = (a:number, b:number) => a + b;
let foo = (something) => console.log(something);

var a = new Action(add);
var bar = new Action(foo);


console.log(a.ap(12, 30));
console.log(bar.ap('asdasd'));