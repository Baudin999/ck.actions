/// <reference path="./../typings/globals/jasmine/index.d.ts" />
import { IFunctor } from './../src/interfaces';
import { Action } from './../src/action';

export default function () {
    describe('An Action', () => {
        it('exists', () => expect(Action).toBeDefined());
        it('should be constructable', () => {
            let add: (x: number, y: number) => number = (x, y) => x + y;
            let a = new Action(add);
            return expect(a.ap).toBeDefined();
        });
        it('can return a tuple', () => {
            let add: (x: number, y: number) => number = (x, y) => x + y;
            let a = new Action(add);
            return expect(a.ap(12, 13)).toEqual(25);
        });
        it('should support currying', () => {
            let add: (x: number, y: number) => number = (x, y) => x + y;
            let a = new Action(add);
            return expect(a.ap(12) instanceof Action).toBeTruthy() &&
                   expect((a.ap(12) as Action<number>).ap(13)).toEqual(25);
        });
    });

    describe('The Empty function', () => {
        it('exists', () => expect(Action.empty).toBeDefined());
        it('can be called and returns an action', () => {
            let e = Action.empty();
            return expect(e).toBeDefined() && expect(e.ap(12)).toEqual([12]);
        });
        it('will return a tuple when applied', () => {
            let a = Action.empty();
            let [first, second] = a.ap(1, 2) as any[]; // we'll need to cast this in order to not get an error
            return expect(first).toEqual(1) && expect(second).toEqual(2);
        });
    });


    describe('An action sould be a Functor', () => {
        it('and have a map function', () => {
            let add: (x: number, y: number) => number = (x, y) => x + y;
            let a = new Action(add) as IFunctor;
            return expect(a.map).toBeDefined();
        });

        it('The map function should compose functions', () => {

            let add: (x: number, y: number) => number = (x, y) => x + y;
            let double: (x: number) => number = (x) => x + x;
            let a = new Action(add);
            let b = a.map(double);

            let result = b.ap(2, 3);
            return expect(result).toEqual(10);

        });

        it('Should be able to compose multiple functions', () => {

            let createList: () => number[] = () => [1, 2, 3, 4, 5, 6];
            let filterEvenNumbers: (list: number[]) => number[] = (list) => list.filter(i => i % 2 === 0);
            let sumNumbers: (list: number[]) => number = (list) => list.reduce((accumulator, i) => accumulator + i, 0);

            let action = new Action(createList).map(filterEvenNumbers).map(sumNumbers);
            let result = action.ap();
            return expect(result).toEqual(12);
        });

        it('Composition should be possible with actions', () => {

            let createList: () => number[] = () => [1, 2, 3, 4, 5, 6];
            let filterEvenNumbers: (list: number[]) => number[] = (list) => list.filter(i => i % 2 === 0);
            let sumNumbers: (list: number[]) => number = (list) => list.reduce((accumulator, i) => accumulator + i, 0);

            let aAction = new Action(createList)
            let bAction = new Action(filterEvenNumbers).map(sumNumbers);
            let cAction = aAction.mapAction(bAction);

            let result = cAction.ap();

            return expect(result).toEqual(12);
        });
    });
}