
export type StepFn<T> = (...args:any[]) => T;

export interface IAction<T> {
    step:StepFn<T>
	ap:(...args:any[]) => T | IAction<T>
}

export interface MapFn {
	<T, U>(t:T) : U;
}
export interface IFunctor {
	map:MapFn;
}


/**
 * This is the type definition of an error. We can either have a
 * string as a message or an error as a list of more ICkErrors.
 */
export interface ICkError {
    message:string;
    errors:ICkError[];
}