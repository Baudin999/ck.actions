import {ICkError} from './interfaces';


/**
 * An implementation of the ICkError interface.
 */
export class CkError implements ICkError {

    message:string;
    errors:ICkError[];

    /**
     * The constructor of the ConcreteCkError class.
     * @param {string | ICkError} m - A recursive parameter.
     */
    constructor(m:string | ICkError) {
        this.errors = [];
        if (m instanceof CkError) {
            this.errors.push(m as ICkError);
        }
        else {
            this.message = m.toString();
        }
    }
}


/**
 * A type which is either a value or an error.
 */
export type Maybe<T> = T | CkError;


/**
 The process class is an items which can be passed around and be used as a result
 from a lited function:   (a -> b) -> Process<a> -> Process<b>
 */
export class Process<T> {

    value:T;
    error:CkError;

    /**
     * This is the Process constructor
     * @constructor
     * @param {Maybe<T>} m - The maybe prameter passed into this constructor
     */
    constructor(m:Maybe<T> | string) {
        if (m instanceof CkError) {
            this.error = (m as CkError);
        }
        else if (typeof m === "string") {
            this.error = new CkError(m);
        }
        else {
            this.value = m;
        }
    }


    static lift<U, V>(f:(u:U) => V) : (_u:Process<U>) => Process<V> {

        return (_u:Process<U>) => {

            // if there is an error, we will just pass the error along and
            // ignore any other calls or functions which need to be called.
            if (_u.error) return new Process<V>(_u.error.message);

            // this is the else branch...
            try {
                let result = f(_u.value);
                return new Process<V>(result);
            }
            catch (ex) {
                return new Process<V>(ex.toString());
            }

        };

    }

}