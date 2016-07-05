/**
 * Created by carloskelkboom on 05/07/16.
 */

import { Process } from './../src/process';

export default function() {


    describe('A process test', () => {

        it('exists', () => {
            expect(Process).toBeDefined();
        });

        it('can be instantiated', () => {


            let p1 = new Process<number>(12);
            let p2 = new Process<number>("Oh noes....");

            return expect(p1.value).toEqual(12) &&
                   expect(p2.error).toBeDefined() &&
                   expect(p2.error.message).toEqual("Oh noes....");
        });

        it('can lift a function', () => {

            let double = (x) => x + x;
            let processDouble = Process.lift(double);
            let result = processDouble(new Process(12));

            expect(result.value).toEqual(24);
        });

    });

}