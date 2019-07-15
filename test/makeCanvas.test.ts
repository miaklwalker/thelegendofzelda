import makeCanvas from "../src/components/functions/canvas"


describe('.sum(%i, %i)',() => {
    test("It should Return a HTML Canvas element", ()=>{ 
      expect(makeCanvas()).not.toBe(null)
    });
  },
);