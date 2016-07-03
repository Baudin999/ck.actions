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
        })
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

            let createList:() => number[] = () => [1,2,3,4,5,6];
            let filterEvenNumbers:(list:number[]) => number[] = (list) => list.filter(i => i % 2 === 0);
            let sumNumbers:(list:number[]) => number = (list) => list.reduce((accumulator, i) => accumulator + i, 0);

            let action = new Action(createList).map(filterEvenNumbers).map(sumNumbers);
            let result = action.ap();
            return expect(result).toEqual(12);
        });

        it('Composition should be possible with actions', () => {

            let createList:() => number[] = () => [1,2,3,4,5,6];
            let filterEvenNumbers:(list:number[]) => number[] = (list) => list.filter(i => i % 2 === 0);
            let sumNumbers:(list:number[]) => number = (list) => list.reduce((accumulator, i) => accumulator + i, 0);

            let aAction = new Action(createList)
            let bAction = new Action(filterEvenNumbers).map(sumNumbers);
            let cAction = aAction.mapAction(bAction);

            let result = cAction.ap();

            return expect(result).toEqual(12);
        });
    });
}