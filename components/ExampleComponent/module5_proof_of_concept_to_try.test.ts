// newFunctionality.test.ts
import { sillyFunction } from './newFunctionality';

describe('sillyFunction', () => {
    it('should return the correct output', () => {
        const result = sillyFunction('test');
        expect(result).toBe('Silly output: test');
    });
});