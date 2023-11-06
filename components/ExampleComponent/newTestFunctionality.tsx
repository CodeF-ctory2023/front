// newTestFunctionality.tsx
export const sillyTestFunction = (input: string | null): string => {
    if (input === null) {
        throw new Error('Input cannot be null');
    }
    return `Silly output: ${input}`;
};
