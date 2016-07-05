/// <reference path="./../typings/index.d.ts" />

import { AsyncAction } from './../src/action-async';
import { Promise } from 'es6-promise';

export default function () {

    describe('An Action async', () => {
        it('exists', () => expect(AsyncAction).toBeDefined());

        it('works with promises', async function(done) {

            let doubleMe = function(n) {
                return new Promise(resolve => {
                    setTimeout(() => resolve(n * 2));
                });
            };

            let a = new AsyncAction(doubleMe);
            (a.ap(6) as Promise<number>).then(r => {
                done(expect(r).toEqual(12));
            });
        });

        it('can supports currying', async function(done) {

            let add:(x:number, y:number) => number = (x,y) => x + y;
            let a = new AsyncAction(add);
            let r = await (a.ap(12) as AsyncAction<Promise<number>>).ap(13);
            done(expect(r).toEqual(25));
        });

        it('is composable', async function(done) {

            let add:(x:number, y:number) => number = (x,y) => x + y;
            let doubleMe = function(n) {
                return new Promise(resolve => {
                    setTimeout(() => resolve(n * 2));
                });
            };

            let a = new AsyncAction(add);
            let b = a.map(doubleMe);
            let c = b.ap(12, 13) as Promise<number>;
            c.then(r => {
                done(expect(r).toEqual(50));
            });
        });

        it('is composable with currying', async function(done) {

            let add:(x:number, y:number) => number = (x,y) => x + y;
            let doubleMe = function(n) {
                return new Promise(resolve => {
                    setTimeout(() => resolve(n * 2));
                });
            };

            let a = new AsyncAction(add);
            let b = a.map(doubleMe);
            let c = b.ap(12) as AsyncAction;
            let d = c.ap(13) as Promise<number>;
            d.then(r => {

                done(expect(r).toEqual(50));

            });
        });

        it('is composable through IActions', async function(done) {

            let add:(x:number, y:number) => number = (x,y) => x + y;
            let doubleMe = function(n) {
                return new Promise(resolve => {
                    setTimeout(() => resolve(n * 2));
                });
            };

            let a = new AsyncAction(add);
            let b = new AsyncAction(doubleMe);
            let c = a.map(b);
            let d = c.ap(12, 13) as Promise<number>;
            d.then(r => {
                done(expect(r).toEqual(50));
            });
        });
    });
}