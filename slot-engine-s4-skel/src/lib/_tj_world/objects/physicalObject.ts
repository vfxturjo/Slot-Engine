import type P5 from 'p5';
import { removeFromList } from '../utils';
import { constraint_AxisLock } from '../constraints/constraint_axisLock';
import type { forces_tj } from '../constraints/base_Constraint_force';

export class physicalObject {
	p: P5;
	position: P5.Vector;
	mass: number = 10;
	force: P5.Vector;
	velocity: P5.Vector;

	// properties
	forceMultiplier = 1;
	velocityDamping: number = 0.5; // from 0 to 1, 0.5 < is bouncy, 0.5 > is smooth

	constraintsList: constraint_AxisLock[] = [];
	forceApplierList: forces_tj[] = [];

	/**
	 * More information are to be added here.
	 **/

	constructor(p5: P5) {
		this.p = p5;
		this.position = this.p.createVector(0, 0);

		this.force = this.p.createVector(0, 0);
		this.velocity = this.p.createVector(0, 0);
	}

	setPhysicalProperty(
		args = {
			mass: this.mass,
			forceMultiplier: this.forceMultiplier,
			velocityDamping: this.velocityDamping
		}
	) {
		this.mass = args.mass;
		this.forceMultiplier = args.forceMultiplier;
		this.velocityDamping = args.velocityDamping;
	}

	//#region adding and removing constraints and forceAppliers
	addLinearSpaceConstraint(linearSpaceConstraint: constraint_AxisLock) {
		this.constraintsList.push(linearSpaceConstraint);
		linearSpaceConstraint.addObject(this);
	}

	removeLinearSpaceConstraint(linearSpaceConstraint: constraint_AxisLock) {
		this.constraintsList = removeFromList(linearSpaceConstraint, this.constraintsList);
		linearSpaceConstraint.removeObject(this);
	}

	addForceApplier(forceApplier: forces_tj) {
		this.forceApplierList.push(forceApplier);
		forceApplier.addObject(this);
	}

	removeForceApplier(forceApplier: forces_tj) {
		this.forceApplierList = removeFromList(forceApplier, this.forceApplierList);
		forceApplier.removeObject(this);
	}

	//#endregion

	//#region physics
	addForce(forceVector: P5.Vector) {
		// accumulate force manually
		this.force.add(forceVector);
	}

	applyForcePhysics() {
		// acceleration (f=ma => a)
		this.velocity.add(this.force.mult(1 / this.mass).mult(this.forceMultiplier)); // f = ma
		this.velocity.mult(this.velocityDamping); // damping the velocity

		this.position.add(this.velocity);
		this.force.set(0, 0);
	}

	step_physics() {
		this.forceApplierList.forEach((forceApplier) => {
			// accumulate force from the forAppliers
			this.force.add(forceApplier.applyForce(this));
		});

		// apply the accumulated force
		this.applyForcePhysics();

		// finally apply the constraints
		this.constraintsList.forEach((constraint) => {
			constraint.apply_this(this);
		});
	}
	//#endregion

	//#region showing/rendering
	show() {
		console.log('physicalObject.show(): not implemented yet');
	}
	//#endregion
}
