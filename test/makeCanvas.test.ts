import makeCanvas from "../src/components/functions/makeCanvas"


describe('A function returning a html canvas ',() => {
    test("It should Return a HTML Canvas element", ()=>{ 
      expect(makeCanvas()).not.toBe(null)
    });
  },
);