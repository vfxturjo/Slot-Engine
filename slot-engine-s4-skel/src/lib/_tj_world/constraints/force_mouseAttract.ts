import type P5 from 'p5';
import { forces_tj } from './base_Constraint_force';
import type { physicalObject } from '../objects/physicalObject';

export class mouseAttractor extends forces_tj {
	forceMultiplier: number;

	/**
	 * More information are to be added here.
	 **/

	constructor(p5: P5, forceMultiplier = 1) {
		super(p5);
		this.forceMultiplier = forceMultiplier;
	}

	show() {
		if (this.p.mouseIsPressed) {
			this.addedObjects.forEach((obj) => {
				this.p.push();
				this.p.stroke('red');
				this.p.line(obj.position.x, obj.position.y, this.p.mouseX, this.p.mouseY);
				this.p.pop();
			});
		}
	}

	applyForce(obj: physicalObject) {
		return this.p
			.createVector(
				this.p.mouseX - obj.position.x, // x force
				this.p.mouseY - obj.position.y // y force
			)
			.mult(this.forceMultiplier);
	}
}
