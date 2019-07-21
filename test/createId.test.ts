import uniqueid from "../src/components/functions/createId"

describe('CreateId should return a string 32 characters long of random numbers and letters',()=>{
    test('UniqueId should only have Capitol Letters & Numbers',()=>{
        expect(uniqueid()).toMatch(/([A-Z,0-9]{32})/)
    })
        test('UniqueId should have a length of 32',()=>{
        expect(uniqueid()).toHaveLength(32)
    })
})