import {Vector} from "../src/components/classes/math/vector"
let vector = new Vector();
let vectorTwo = new Vector(6,6);
afterEach(()=>{
    vector = new Vector();
    vectorTwo = new Vector(6,6);
})
it("This Class Should Return a vector",()=>{
    expect(vector).toEqual({x:0,y:0});
})
it("If parameters are provided they should be used for x and y",()=>{
    expect(new Vector(2,2)).toEqual({x:2,y:2});
    expect(new Vector(3,2)).toEqual({x:3,y:2});
})
it("The Same Method Should return true if two vectors are the same",()=>{
      expect(vector.same(new Vector(2,2))).toEqual(false)
      expect(vector.same(new Vector(0,0))).toEqual(true)
})
it("The Add Method should add a Scala to the vector",()=>{
    const vector6 = new Vector().add(vector)
    expect(vector6).toEqual(vector6)
})
it.each([[3,3,-3],[4,4,-4],[5,5,-5]])(
    'Vector.distanceX(Vector(%i,%i) should be %i',(a,b,expected)=>{
        expect(new Vector().distanceX(new Vector(a,b))).toEqual(expected)
    }
)
 it.each([[3,3,-3],[4,4,-4],[5,5,-5]])(
    'Vector.distanceY(Vector(%i,%i) should be %i',(a,b,expected)=>{
        expect(new Vector().distanceY(new Vector(a,b))).toEqual(expected)
    }
)