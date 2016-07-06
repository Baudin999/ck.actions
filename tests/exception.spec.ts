import {Exception} from './../src/exception';

export default function () {


    describe('An exception test', () => {

        it('exists', () => {
            expect(Exception).toBeDefined();
        });

        it('can be instantiated with a string', () => {
            let ex = new Exception("an error");
            return expect(ex).toBeDefined() &&
                   expect(ex.message).toEqual("an error");
        });

        it('can be instantiated with a string', () => {
            let ex = new Exception("an error");
            return expect(ex).toBeDefined() &&
                expect(ex.message).toEqual("an error");
        });

        it('can have a collection of errors', () => {

            let ex = new Exception("An example exception");
            ex.add("Another exception");
            ex.add(new Exception("Yet another exception"));

            return expect(ex.errors.length).toEqual(2);

        });


    });

}