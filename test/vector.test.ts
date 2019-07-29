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
    expect(new Vector()).toEqual({x:0,y:0});
})
it("The .Same Method Should return true if two vectors are the same",()=>{
      expect(vector.same(new Vector(2,2))).toEqual(false)
      expect(vector.same(new Vector(0,0))).toEqual(true)
})
it("The Add Method should add a Vector  to the vector",()=>{
    let vec = new Vector(0,0)
    let vec6= new Vector(6,6)
    vec.add(vec6)
    expect(vec).toEqual({x:6,y:6})
})
it("The AddX Method should add a Vector's X  to the Vector's X",()=>{
    let vec = new Vector(0,0)
    let vec6= new Vector(6,6)
    vec.addX(vec6)
    expect(vec).toEqual({x:6,y:0});
})
it("The AddY Method should add a Vector's Y  to the Vector's Y",()=>{
    let vec = new Vector(0,0)
    let vec6= new Vector(6,6)
    vec.addY(vec6)
    expect(vec).toEqual({x:0,y:6});
})
it("The Subtract Method should subtract a Vector from the vector",()=>{
    let vec = new Vector(0,0)
    let vec6= new Vector(6,6)
    vec.subtract(vec6)
    expect(vec).toEqual({x:-6,y:-6});
})
it("The SubtractX Method should subtract a Vector's X from the Vector's X",()=>{
    let vec = new Vector(0,0)
    let vec6= new Vector(6,6)
    vec.subtractX(vec6)
    expect(vec).toEqual({x:-6,y:0});
})
it("The SubtractY Method should subtract a Vector's Y from the Vector's Y",()=>{
    let vec = new Vector(0,0)
    let vec6= new Vector(6,6)
    vec.subtractY(vec6)
    expect(vec).toEqual({x:0,y:-6});
})
it("Should take a Vector or Scala as a arguement and multiply the Vectors together",()=>{
    let vec = new Vector(2,2);
    let vec2 = new Vector(6,6);
    let vec3 = new Vector(2,2)
    vec.mult(vec2);
    vec3.mult(2)
    expect(vec).toEqual({x:12,y:12});
    expect(vec3).toEqual({x:4,y:4});
});
  it("Should take a Vector or Scala as a arguement and Divide the Vectors",()=>{
    let vec = new Vector(6,6);
    let vec2 = new Vector(2,2);
    let vec3 = new Vector(2,2)
    vec.div(vec2);
    vec3.div(2)
    expect(vec).toEqual({x:3,y:3});
    expect(vec3).toEqual({x:1,y:1});
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
it.each([[5,6,2,2,5],[6,6,3,2,5],[4,7,4,3,4]])('Vector(%i,%i).distance(%i,%i) should be %i',(a,b,c,d,expected)=>{
    let vec = new Vector(a,b);
    let other = new Vector(c,d);
    let dist = vec.distance(other)
    expect(dist).toEqual(expected)
})
it.each([[5,6,2,2,25],[6,6,3,2,25],[4,7,4,3,16]])('Vector(%i,%i).distanceSq(%i,%i) should be %i',(a,b,c,d,expected)=>{
    let vec = new Vector(a,b);
    let other = new Vector(c,d);
    let dist = vec.distanceSq(other)
    expect(dist).toEqual(expected)
})

it("Should limit a Vector to the parameter",()=>{
    let vec = new Vector(6,6);
    let vec2 = new Vector(1,1);
    vec2.limit(3)
    vec.limit(3)
    expect(vec.x).toBeLessThan(3)
    expect(vec.y).toBeLessThan(3)
    expect(vec2).toEqual({x:1,y:1})
})