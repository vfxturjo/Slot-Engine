import type P5 from 'p5';
import { forces_tj } from './base_Constraint_force';

export class mouseAttractor extends forces_tj {
	forceMultiplier: number;

	constructor(p5: P5, forceMultiplier = 0.1) {
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

	apply() {
		this.addedObjects.forEach((obj) => {
			const force = this.p.createVector(0, 0);

			force.x = this.p.mouseX - obj.position.x;
			force.y = this.p.mouseY - obj.position.y;

			obj.velocity.add(force.mult(this.forceMultiplier));
			obj.position.add(obj.velocity);
		});
	}
}
