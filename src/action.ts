
import { IAction, IFunctor, StepFn } from './interfaces';

export class Action<T> implements IAction<T>, IFunctor {
	
	private step:StepFn<T>;
	
	constructor(f:StepFn<T>) {
		this.step = f;
	}
	 
	/*
	Appply the step function
	*/
	ap(...args) : T { 
		return this.step.apply(null, args);
	}

	/*
	Map should return a new Action, concatting the newly supplied function

	u.map(a => a) is equivalent to u (identity)
	u.map(x => f(g(x))) is equivalent to u.map(g).map(f) (composition)

	In our case 'a' would be a function of type StepFn. T should be a function
	which takes as a parameter a function of type StepFn and return a StepFn,
	which we than wrap in a new Action and return. I am aware that this is mighty 
	complicated....
	*/
	map<U>(t:StepFn<U>) {
		
		// create the new function by composing the current step with the new function
		// f(g(x)) so we do something like:
		// t( this.step(x) );
		let f:StepFn<U> = (...args) => {
			let result = this.step.apply(this, args);
			return t(result);
		};

		return new Action(f);
	}

	mapAction<U>(a:Action<U>) {
		return this.map(a.step);
	}
}

 