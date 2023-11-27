// newFunctionality.test.tsx
import { sillyTestFunction } from './newTestFunctionality';

describe('sillyFunction', () => {
    // Test for normal input
    it('should prepend "Silly output: " to the input string', () => {
        expect(sillyTestFunction('test')).toBe('Silly output: test');
        expect(sillyTestFunction('123')).toBe('Silly output: 123');
    });

    // Test for empty string input
    it('should handle an empty string', () => {
        expect(sillyTestFunction('')).toBe('Silly output: ');
    });

    // Test for null input
    it('should throw an error if input is null', () => {
        expect(() => sillyTestFunction(null)).toThrow('Input cannot be null');
    });
});
