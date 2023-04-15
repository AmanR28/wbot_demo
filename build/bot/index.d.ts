export default class Bot {
    userId: string;
    constructor(userId: string);
    reply(input: string): Promise<string>;
}
