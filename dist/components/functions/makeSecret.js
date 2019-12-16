import { subtypes } from "../objects/secretInterfaces";
export default class Secret {
    constructor(secret) {
        this.type = secret.type;
        this.subType = this.makeSubType(secret);
        this.location = secret.location;
        this.enterable = secret.enterable;
        this.condition = secret.condition;
    }
    makeType(type) { }
    makeSubType(secret) {
        return subtypes[this.type][secret.subType];
    }
}
//# sourceMappingURL=makeSecret.js.map