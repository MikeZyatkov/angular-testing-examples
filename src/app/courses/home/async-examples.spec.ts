import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

describe('Async Testing examples', () => {
    it('Asynchronous test examples with Jasmine done()', (done: DoneFn) => {
        let test = false;

        setTimeout(() => {
            console.log('running assertions');
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 1000);
    });

    it('Asynchronous test examples with setTimeout()', fakeAsync(() => {
        let test = false;

        setTimeout(() => {
            console.log('running assertions setTimeout');
            test = true;
        }, 1000);
        tick(1000);
        expect(test).toBeTruthy();
    }));

    it('Asynchronous test examples - plain Promise', fakeAsync(() => {
       let test = false;
       console.log('Creating promise');
       Promise.resolve().then(() => {
           console.log('Promise evaluated successfully');
           test = true;
       });
       flushMicrotasks();
       console.log('Running test assertions');
       expect(test).toBeTruthy();
    }));

    it('Asynchronous test examples - Promises + setTimeout', fakeAsync(() => {
       let counter = 0;

       Promise.resolve()
           .then(() => {
               counter += 10;
               setTimeout(() => {
                   counter += 1;
               }, 1000);
           });
       expect(counter).toBe(0);
       flushMicrotasks();
       expect(counter).toBe(10);
       tick(500);
       expect(counter).toBe(10);
       tick(500);
       expect(counter).toBe(11);
    }));

    it('Asynchronous test examples - Observables', fakeAsync(() => {
        let test = false;
        console.log('Creating Observables');
        const test$ = of(test).pipe(delay(1000));
        test$.subscribe(() => {
            test = true;
        });
        tick(1000);
        console.log('Running test assertions');
        expect(test).toBeTruthy();
    }));
});
