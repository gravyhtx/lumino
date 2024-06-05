/**
 * Increments the given state by one, wrapping around when reaching
 * Number.MAX_SAFE_INTEGER to avoid integer overflow.
 * 
 * @param {number} state - The current state value.
 * @returns {number} The incremented state value.
 */
export const stateChanger = (state: number): number => (state + 1) % Number.MAX_SAFE_INTEGER;