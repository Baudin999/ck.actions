
export type StepFn<T> = (...args:any[]) => T;

export interface IAction<T> {
    step:StepFn<T>
	ap:(...args:any[]) => T | IAction<T>
}

export interface MapFn {
	<T, U>(t:T) : U;
}

/**
 * A functor defines a map function.
 */
export interface IFunctor {
	map:MapFn;
}

/**
 * A generic monadic type definition
 */
export interface IWrapper<T> {
    value:T;
}

/**
 * We might want to use a lift function on multiple monadic types. In this case we use an IWrapper to signal a Monad. (A lift function is the same as an fmap.
 *
 * Signature: (f:(t:T) => U) => (w:IWrapper<T>) => IWrapper<U>
 */
export type LiftFn<T,U> = (f:(t:T) => U) => (p:IWrapper<T>) => IWrapper<U>;


/**
 * This is the type definition of an error. We can either have a
 * string as a message or an error as a list of more ICkErrors.
 */
export interface IException {
    message:string;
    errors:IException[];
}
