
import { Promise } from 'es6-promise';

export class AsyncAction {
    constructor() {
        
    }
    
    foo() {
        return new Promise<number>((resolve, reject) => {
            setTimeout(() => {
                resolve(12);
            }, 1000);
        });
    }
}
