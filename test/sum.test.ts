import sum from "../src/components/functions/sum"

describe.each([[1, 1, 2], [1, 2, 3], [2, 1, 3]])(
  '.sum(%i, %i)',
  (a, b, expected) => {
    test(`returns ${expected}`, ()=>{ 
      expect(sum(a,b)).toBe(expected)
    });

    test(`returned value not be greater than ${expected}`, () => {
      expect(sum(a,b)).not.toBeGreaterThan(expected)
    });

    test(`returned value not be less than ${expected}`, () => {
      expect(sum(a,b)).not.toBeLessThan(expected)
    });
  },
);