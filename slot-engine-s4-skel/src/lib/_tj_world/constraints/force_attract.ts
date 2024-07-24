import type P5 from 'p5';
import { forces_tj } from './base_Constraint_force';
import type { physicalObject } from '../objects/physicalObject';
import { clampToMinZero, mapRange } from '../utils';

export class objectAttractorSingle extends forces_tj {
	to_obj: physicalObject; // attract to this object
	forceMultiplier: number;
	normalized: boolean;
	distance_inversed: boolean;
	max_force_value: number;
	forceRadius: number;
	power: number;
	forceAtDistance2: number;
	showAppliedForce: boolean;

	/**
	 * A force object that can act on a Physical object.
	 *
	 * @param to_obj: physicalObject to be attracted to
	 * @param forceMultiplier: overall power. (+ve) for attract, (-ve) for repel
	 * @param normalized: if true, distance won't effect the force power. use `forceMultiplier` to control the power
	 * @param distance_inversed: if true, closer distance will induce more force
	 * @param max_force_value: a clamp value for max force. must use if `distance_inversed` is used
	 * @param forceRadius: the circular area radius where the force will be applied
	 * @param power: the curve of the applied force by each distance. use value between 1 to 10. 1 for linear, 2 for square curve. *Must change it using a function*
	 **/

	constructor(
		p5: P5,
		to_obj: physicalObject,
		forceMultiplier = 1,
		distance_inversed = false,
		normalized = false,
		max_force_value = Infinity,
		forceRadius = 3000,
		power = 1.5,
		showAppliedForce = false
	) {
		super(p5);
		this.to_obj = to_obj;
		this.normalized = normalized;
		this.forceMultiplier = forceMultiplier;
		this.max_force_value = max_force_value;
		this.distance_inversed = distance_inversed;
		this.forceRadius = forceRadius;
		this.power = power;
		this.showAppliedForce = showAppliedForce;

		//settings power
		this.forceAtDistance2 = (this.forceRadius - 2) ** this.power;
	}

	recalcProperties() {
		this.forceAtDistance2 = (this.forceRadius - 2) ** this.power;
	}

	show() {
		// debugging force values will be done using applyForce method and ``
		this.addedObjects.forEach((obj: physicalObject) => {
			this.p.push();
			this.p.stroke('red');
			this.p.strokeWeight(1);
			this.p.line(this.to_obj.position.x, this.to_obj.position.y, obj.position.x, obj.position.y);
			this.p.pop();
		});

		// console.log('force attract vis: not implemented');

		// if (this.p.mouseIsPressed) {
		// 	this.addedObjects.forEach((obj: physicalObject) => {
		// 		this.p.push();
		// 		this.p.stroke('red');
		// 		this.p.translate(obj.position.x, obj.position.y);
		// 		this.p.line(0, 0, this.to_obj.position.x, this.to_obj.position.y);
		// 		this.p.pop();
		// 	});
		// }
	}

	applyForce(obj: physicalObject) {
		// here, force is based on distance
		const force = this.p.createVector(
			this.to_obj.position.x - obj.position.x,
			this.to_obj.position.y - obj.position.y
		);

		if (this.distance_inversed) {
			force.setMag(
				mapRange(
					// clamping to min zero
					clampToMinZero(
						// fixed distance
						this.forceRadius - force.mag()
					) **
						// applying power
						this.power,
					0,
					this.max_force_value,
					0,
					// calculating for 2 (or use 1?)
					this.forceAtDistance2
				)
			);
		}

		this.p.push();
		this.p.fill('yellow');
		this.p.rect(0, 0, 10, force.mag());
		this.p.pop();

		if (this.normalized) {
			force.normalize();
		}

		force.mult(this.forceMultiplier);

		// debug force
		if (this.showAppliedForce) {
			this.drawAppliedForce(obj.position, force);
		}

		return force;
	}

	drawAppliedForce(objPosition: P5.Vector, force: P5.Vector) {
		this.p.push();
		this.p.translate(objPosition.x, objPosition.y);
		this.p.line(0, 0, force.x, force.y);
		this.p.pop();
	}
}
