import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';

describe('Calculator service', () => {
    let logger: LoggerService;
    let calc: CalculatorService;

    beforeEach(() => {
       logger = jasmine.createSpyObj('LoggerService', ['log']);
       TestBed.configureTestingModule({
          providers: [
              CalculatorService,
              {
                  provide: LoggerService,
                  useValue: logger
              }
          ]
       });
       calc = TestBed.inject(CalculatorService);
    });

    it('should add two numbers', () => {
        const result = calc.add(2, 2);
        expect(result).toBe(4);
        expect(logger.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {
        const result = calc.subtract(2, 2);
        expect(result).toBe(0, 'unexpected subtraction result');
        expect(logger.log).toHaveBeenCalledTimes(1);
    });
});
