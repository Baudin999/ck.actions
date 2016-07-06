


/// <reference path="./../typings/index.d.ts" />
//import { Observable, Observer } from 'rx';
import { ObservableAction } from './../src/action-observable';

export default function () {

    describe('An observable action', () => {
        it('exists', () => expect(ObservableAction).toBeDefined());

        it('can be subscribed to', (done) => {

            let add = (x:number, y:number) => x + y;

            var observableAction = new ObservableAction(add);
            observableAction.subscribe(val => {
                done(expect(val).toEqual(25));
            });

            setTimeout(() => observableAction.ap(12, 13), 0);
        });

        it('can be composed', (done) => {
        
            let add = (x:number, y:number) => x + y;
            let double = (x:number) => x * 2;
            let verify = (x:number) => expect(x).toEqual(50);
            let areWeDone = (b:boolean) => done(b);
        
            let a = new ObservableAction(add).map(double).map(verify).map(areWeDone);
            a.subscribe(val => console.log("Subscribed to the event stream..."));
            a.ap(12, 13);
        });
    });
}
