/// <reference path="./../typings/globals/jasmine/index.d.ts" />
import { Action } from './../src/action';

export default function() {
    describe('An Action', () => {
        it('exists', () => expect(Action).toBeDefined());
        it('should be constructable', () => {
            let add:(x:number, y:number) => number = (x, y) => x + y;
            let a = new Action(add);
            return expect(a.ap).toBeDefined();
        })
    });
}