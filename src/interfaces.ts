
export type StepFn<T> = (...args:any[]) => T;

export interface IAction<T> {
	ap:(...args:any[]) => T | IAction<T>
}

export interface MapFn {
	<T, U>(t:T) : U;
}
export interface IFunctor {
	map:MapFn;
}