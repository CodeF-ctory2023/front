// newFunctionality.test.ts
import { sillyFunction } from './module5_proof_of_concept_to_try.tsx';

describe('sillyFunction', () => {
    it('should return the correct output', () => {
        const result = sillyFunction('test');
        expect(result).toBe('Silly output: test');
    });
});
