import controlsConfig from '../src/components/classes/systems/controlsConfig'

describe('Control Config Class Should Return a Control Config Object',()=>{
      let keys:[string,string,string,string,string,string,string,string] = ['up','down','left','right','start','select','A','B']
      let keyControls = new controlsConfig(...keys)
      it('should assign the inputs to the corrext buttons',()=>{
      for(let i = 0 ; i < keys.length;i++){
            expect(keys[i]).toEqual(keyControls[keys[i]])
      }
      })
})