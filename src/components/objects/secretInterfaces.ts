export interface SecretTemp{
    [index:string]:any
     type:string,
     subType:string,
     location:[number,number,number,number,number],
     enterable:boolean,
     condition:string
 }
 export let subtypes:{[index:string]:any} = {
     cave:{
         rupee:{},
         shop:{},
         heart:{},
         game:{},
         hint:{},
         sword:{},
     },
     secret:{
         rupee:{},
         shop:{},
         heart:{},
         game:{},
         hint:{test:"I Exist"},
     },
     dungeon:{
         dungeonOne:{},
         dungeonTwo:{},
         dungeonThree:{},
         dungeonFour:{},
         dungeonFive:{},
         dungeonSix:{},
         dungeonSeven:{},
         dungeonEight:{},
         dungeonNine:{},    
     },
 }

 export let conditions = ['bombable','flute','burnable','fakeWall','pushable'].map(el=>[el,el])
 