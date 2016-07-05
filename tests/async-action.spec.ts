/// <reference path="./../typings/index.d.ts" />
import { IFunctor } from './../src/interfaces';
import { Action } from './../src/action';
import { AsyncAction } from './../src/action-async';

export default function () {

    describe('An Action async', () => {
        it('exists', () => expect(AsyncAction).toBeDefined());
        it('foo exists', () => expect(AsyncAction.prototype.foo).toBeDefined());
        it('can be fired', (done) => {
            let a = new AsyncAction();
            a.foo().then((r) => {
                done(expect(r).toEqual(12));
            });
        });
    });
}