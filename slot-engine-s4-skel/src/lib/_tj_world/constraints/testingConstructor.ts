// this works actually

interface constructorArgs {
	thing1?: number;
	thing2?: number;
	thing3?: number;
}

export class testing_things {
	thing1: number;
	thing2: number;
	thing3: number;

	constructor({ thing1 = 10, thing2 = 20, thing3 = 30 }: constructorArgs = {}) {
		this.thing1 = thing1;
		this.thing2 = thing2;
		this.thing3 = thing3;
	}
}

///////////////

export class testing_things1 {
	thing1: number = 10;
	thing2: number = 20;
	thing3: number = 30;

	constructor(
		public a: number,
		args: constructorArgs = {}
	) {}

	thing() {
		console.log(this.a);
	}
}
