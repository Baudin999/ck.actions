
import { IWrapper } from './interfaces';
import { Exception } from './exception';

/**
 * A type which is either a value or an error.
 */
export type Maybe<T> = T | Exception;


/**
 The process class is an items which can be passed around and be used as a result
 from a lited function:   (a -> b) -> Process<a> -> Process<b>
 */
export class Process<T> implements IWrapper<T> {

    value:T;
    error:Exception;

    /**
     * This is the Process constructor
     * @constructor
     * @param {Maybe<T>} m - The maybe prameter passed into this constructor
     */
    constructor(m:Maybe<T> | string) {
        if (m instanceof Exception) {
            this.error = (m as Exception);
        }
        else if (typeof m === "string") {
            this.error = new Exception(m.toString());
        }
        else {
            this.value = m;
        }
    }


    /**
     * A simple lift function which lifts a function to the realm of Process
     * @param {LiftFn} f - The function which needs to be lifted into a monadic space.
     * @returns {function(Process<U>): Process<V>}
     */
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