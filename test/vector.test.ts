import {Vector} from "../src/components/classes/math/vector"

let vector = new Vector()
test("This Class Should Return a vector",()=>{
    expect(vector).toEqual({x:0,y:0});
})