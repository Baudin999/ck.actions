
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
	*/
	map<U>(t:T) {
		return {};
	}
}

 