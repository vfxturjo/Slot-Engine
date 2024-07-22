import type P5 from 'p5';
import type { physicalObject } from '../objects/physicalObject';
import { removeFromList } from '../utils';

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
	removeObject(object: physicalObject) {
		this.addedObjects = removeFromList(object, this.addedObjects);
	}
	logObjects() {
		console.log(this.addedObjects);
	}

	apply_global() {
		this.addedObjects.forEach((obj: physicalObject) => {
			this.apply_this(obj);
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	apply_this(obj: physicalObject) {
		console.log('apply_this: extend of constraints_tj, not yet implemented');
	}
}

export class forces_tj extends constraints_tj {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	applyForce(obj: physicalObject) {
		console.log('applyForce: extend of forces_tj, not yet implemented');
		return this.p.createVector(0, 0);
	}
}
