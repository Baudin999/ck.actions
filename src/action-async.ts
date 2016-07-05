
import { IAction, IFunctor, StepFn } from './interfaces';
import { Promise } from 'es6-promise';

function promisify(val:any) {
    if (val instanceof Promise) return val;
    else {
        return new Promise(function (resolve) {
            setTimeout(() => resolve(val));
        });
    }
}

export class AsyncAction<T> implements IAction<Promise<T>>, IFunctor {

    private step:StepFn<T>;
    private length:number;


    /*
     The constructor function taking a Step Function as a parameter
     The step function is of type: (...args:any[]) => T
     */
    constructor(f:StepFn<T>, n?:number) {
        this.step = f;
        this.length = n || f.length;
    }

    ap(...args):Promise<T> | AsyncAction<Promise<T>> {

        // of course we'd want to support currying...
        if (args.length < this.length) {
            let curried = (...args2) => this.ap.apply(this, args.concat(args2));
            return new AsyncAction(curried) as AsyncAction<Promise<T>>;
        }
        else {
            return promisify(this.step.apply(this, args)) as Promise<T>;
        }
    }


    map<U>(t:StepFn<U>) {

        // create the new function by composing the current step with the new function
        // f(g(x)) so we do something like:
        // t( this.step(x) );
        let f:StepFn<U> = (...args) => {

            return new Promise((resolve) => {
                this.ap.apply(this, args).then(r1 => {

                    var r2 = t(r1);
                    if (r2 instanceof Promise) {
                        r2.then(r3 => resolve(r3));
                    }
                    else {
                        resolve(r2);
                    }

                });
            });

        };

        return new AsyncAction(f, this.length);
    }

}
