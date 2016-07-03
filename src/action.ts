
import { IAction, IFunctor, StepFn } from './interfaces';

export class Action<T> implements IAction<T>, IFunctor {
	
	private step:StepFn<T>;
	
	/*
	The constructor function taking a Step Function as a parameter
	The step function is of type: (...args:any[]) => T
	*/
	constructor(f:StepFn<T>) {
		this.step = f;
	}
	 
	/*
	Apply the step function
	*/
	ap(...args) : T | Action<T> { 

		// of course we'd want to support currying...
		if (args.length < this.step.length) {
			let curried = (...args2) => this.ap.apply(this, args.concat(args2));
			return new Action(curried);
		}

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
			return t.apply(this, [result]);
		};

		return new Action(f);
	}
	/* map an action, simple wrapper to unwrap and apply the Action */
	mapAction<U>(a:Action<U>) {
		return this.map(a.step);
	}

	// Create an empty Action which just returns the parameters as arguments.
	static empty() {
		return new Action((...args)=> { return args; });
	}
}

 