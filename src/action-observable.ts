
import { Action } from './action';
import { IAction, IFunctor, StepFn } from './interfaces';
import { Observer, Observable } from 'rx';

export class ObservableAction<T> implements IAction<T>, IFunctor {

    private step:StepFn;
    public observable:Observable;
    private observer:Observer;

    constructor(f:StepFn) {
        this.step = f;
        this.observable = Observable.create((observer:Observer) => {
            this.observer = observer;
        });
    }


    subscribe(next, error?, complete?) {
        this.observable.subscribe(next, error, complete);
    }

    ap(...args) {
        let result = this.step.apply(this, args);
        if (this.observer) {
            this.observer.onNext(result);
        }
        return result;
    }

    map<U>(f:Function) {

        let t:StepFn<U> = (...args) => {
            let result = this.step.apply(this, args);
            return (f as StepFn<U>).apply(this, [result]);
        };

        let newObservable = new ObservableAction(t);

        return newObservable;
    }

}
