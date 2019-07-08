export default class Message {
    to: string;
    from: string;
    type: string;
    data: any;
    constructor(to: string, from: string, type: string, data: any);
}
