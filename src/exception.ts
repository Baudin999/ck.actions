import {IException} from './interfaces';


/**
 * An implementation of the IException interface.
 */
export class Exception implements IException {

    message:string;
    errors:IException[];

    /**
     * The constructor of the ConcreteCkError class.
     * @param {string | IException} m - A recursive parameter.
     */
    constructor(m:string | IException) {
        this.errors = [];
        if (m instanceof Exception) {
            this.errors.push(m as IException);
        }
        else {
            this.message = m.toString();
        }
    }

    /**
     * Add an exception to the collection of errors.
     * @param {string | IException} m
     */
    add(m:string | IException) {
        if (m instanceof Exception) {
            this.errors.push(m as IException);
        }
        else {
            this.errors.push(
                new Exception(m));
        }
    }
}