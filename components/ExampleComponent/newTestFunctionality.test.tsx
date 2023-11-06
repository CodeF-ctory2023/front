// newFunctionality.test.tsx
import { sillyFunction } from './newTestFunctionality';

describe('sillyFunction', () => {
    // Test for normal input
    it('should prepend "Silly output: " to the input string', () => {
        expect(sillyFunction('test')).toBe('Silly output: test');
        expect(sillyFunction('123')).toBe('Silly output: 123');
    });

    // Test for empty string input
    it('should handle an empty string', () => {
        expect(sillyFunction('')).toBe('Silly output: ');
    });

    // Test for null input
    it('should throw an error if input is null', () => {
        expect(() => sillyFunction(null)).toThrow('Input cannot be null');
    });
});
