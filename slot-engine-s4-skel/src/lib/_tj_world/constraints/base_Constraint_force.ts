import type P5 from 'p5';
import type { physicalObject } from '../objects/physicalObject';

export class constraints_tj {
	p: P5;
	addedObjects: physicalObject[] = [];

	constructor(p5: P5) {
		this.p = p5;
	}

	// adding and removing objects
	addObject(object: physicalObject) {
		this.addedObjects.push(object);
	}
	logObjects() {
		console.log(this.addedObjects);
	}
}

export class forces_tj extends constraints_tj {}
