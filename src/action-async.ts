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

    public step:StepFn<T>;
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


    map<U>(t:StepFn<U> | AsyncAction<U>) : AsyncAction<Promise<U>> {

        /*
            When the property is an action we can mapAction...
         */
        if (t instanceof AsyncAction) {
            return this.mapAction(t as IAction<U>);
        }

        /*
            create the new function by composing the current step with the new function
            The difficulty is that every step can either be a promise or a real value,
            this is why
        */
        let f:StepFn<U> = (...args) => {
            return new Promise((resolve) => {
                this.ap.apply(this, args).then(r1 => {
                    promisify((t as Function)(r1)).then(r2 => resolve(r2));
                });
            });
        };

        return new AsyncAction(f, this.length);
    }

    /* map an action, simple wrapper to unwrap and apply the AsyncAction */
    mapAction<U>(a:IAction<U>) : AsyncAction<Promise<U>> {
        return this.map(a.step);
    }

}
