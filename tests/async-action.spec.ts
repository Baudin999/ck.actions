/// <reference path="./../typings/index.d.ts" />

import { AsyncAction } from './../src/action-async';

export default function () {

    describe('An Action async', () => {
        it('exists', () => expect(AsyncAction).toBeDefined());
        it('can be fired', async function(done) {
            let add:(x:number, y:number) => number = (x,y) => x + y;
            let a = new AsyncAction(add);
            let r = await a.ap(12).ap(13);
            done(expect(r).toEqual(25));
        });
    });
}