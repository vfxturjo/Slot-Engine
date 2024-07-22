import type P5 from 'p5';
import { forces_tj } from './base_Constraint_force';
import type { physicalObject } from '../objects/physicalObject';
import { clamp } from '../utils';

export class objectAttractorSingle extends forces_tj {
	to_obj: physicalObject; // attract to this object
	forceMultiplier: number;
	normalized: boolean;
	distance_inversed: boolean;
	max_force_value: number;

	/**
	 * A force object that can act on a Physical object.
	 *
	 * @param to_obj: physicalObject to be attracted to
	 * @param forceMultiplier: overall power. (+ve) for attract, (-ve) for repel
	 * @param normalized: if true, distance won't effect the force power. use `forceMultiplier` to control the power
	 * @param distance_inversed: if true, closer distance will induce more force
	 * @param max_force_value: a clamp value for max force. must use if `distance_inversed` is used
	 **/

	constructor(
		p5: P5,
		to_obj: physicalObject,
		forceMultiplier = 1,
		normalized = false,
		distance_inversed = false,
		max_force_value = Infinity
	) {
		super(p5);
		this.to_obj = to_obj;
		this.normalized = normalized;
		this.forceMultiplier = forceMultiplier;
		this.distance_inversed = distance_inversed;
		this.max_force_value = max_force_value;
	}

	show() {
		console.log('force attract vis: not implemented');

		if (this.p.mouseIsPressed) {
			this.addedObjects.forEach((obj: physicalObject) => {
				this.p.push();
				this.p.stroke('red');
				this.p.translate(obj.position.x, obj.position.y);
				this.p.line(0, 0, this.to_obj.position.x, this.to_obj.position.y);
				this.p.pop();
			});
		}
	}

	applyForce(obj: physicalObject) {
		let distance: P5.Vector;
		if (!this.distance_inversed) {
			distance = this.p.createVector(
				this.to_obj.position.x - obj.position.x, // x force
				this.to_obj.position.y - obj.position.y // y force
			);
		} else {
			distance = this.p.createVector(
				// x force,
				clamp(1 / (this.to_obj.position.x - obj.position.x), 0, this.max_force_value),
				// y force,
				clamp(1 / (this.to_obj.position.y - obj.position.y), 0, this.max_force_value)
			);
		}

		if (this.normalized) {
			distance.normalize();
		}

		return distance.mult(this.forceMultiplier);
	}
}
