import { subtypes, SecretTemp } from "../objects/secretInterfaces";
import { selectFactory } from "./makeSelect";


export default class Secret{
    type: string;
    subType: any;
    location: any;
    enterable: any;
    condition: any;
    constructor(secret:SecretTemp){
        this.type = secret.type
        this.subType = this.makeSubType(secret)
        this.location = secret.location
        this.enterable = secret.enterable
        this.condition = secret.condition
    }
    makeType(type: any){}
    makeSubType(secret:SecretTemp){
      return subtypes[this.type][secret.subType]
}
}
