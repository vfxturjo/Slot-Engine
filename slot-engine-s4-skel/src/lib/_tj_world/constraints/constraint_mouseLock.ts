import type P5 from 'p5';
import { constraints_tj } from './base_Constraint_force';
import type { physicalObject } from '../objects/physicalObject';

export class constraint_mouseLock extends constraints_tj {
	/**
	 * More information are to be added here.
	 **/

	constructor(p5: P5) {
		super(p5);
	}

	show() {
		// showing current mouse coordinates
		this.p.push();
		this.p.stroke('red');
		this.p.text(`${this.p.mouseX}, ${this.p.mouseY}`, this.p.mouseX, this.p.mouseY);
		this.p.pop();
	}

	apply_this(obj: physicalObject) {
		obj.position.x = this.p.mouseX;
		obj.position.y = this.p.mouseY;
	}
}
