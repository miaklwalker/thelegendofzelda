import controls from '../src/components/classes/systems/controls'
import controlsConfig from '../src/components/classes/systems/controlsConfig'

describe('Should Add Event Listners for all of the controls',()=>{
      test('That the controls are correctly assigned',()=>{
      let keys:[string,string,string,string,string,string,string,string] = ['up','down','left','right','start','select','A','B']
      let keyControls = new controlsConfig(...keys)
      let Controls = new controls(keyControls)
      let buttons = Object.values(Controls);
      for (let i = 0 ; i < keys.length ; i++){
            expect(keys[i]).toEqual(buttons[i])
      }
      })
})