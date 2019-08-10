import camera from "../src/components/classes/systems/camera"

describe('Should Create a Camera Class that displays a portion of the whole map',()=>{
      it('should return a camera object',()=>{
            let Camera = new camera();
            expect(Camera.position).toEqual({x:0,y:0})
      })
})

