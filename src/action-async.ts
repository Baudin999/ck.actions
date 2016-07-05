
import { IAction, IFunctor, StepFn } from './interfaces';
import { Promise } from 'es6-promise';

export class AsyncAction<T> implements IAction<Promise<T>> {

    private step:StepFn<T>;

 
    /*
     The constructor function taking a Step Function as a parameter
     The step function is of type: (...args:any[]) => T
     */
    constructor(f:StepFn<T>) {
        this.step = f;
    }

    ap(...args) {
        // of course we'd want to support currying...
        if (args.length < this.step.length) {
            let curried = (...args2) => this.ap.apply(this, args.concat(args2));
            return new AsyncAction(curried) as AsyncAction<Promise<T>>;
        }
        
        else {
            let result = this.step.apply(null, args);
            if (result instanceof Promise) {
                return result
            }
            else {
                return new Promise(resolve => {
                   setTimeout(() => resolve(result));
                });
            }
        }
    }

}
