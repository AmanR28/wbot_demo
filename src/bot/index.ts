export default class Bot {
	public userId: string;
	constructor(userId: string) {
		this.userId = userId;
	}

	public async reply(input: string) {
		return "Ohk : " + input;
	}
}
