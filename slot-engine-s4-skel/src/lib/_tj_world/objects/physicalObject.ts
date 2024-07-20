import type P5 from 'p5';
import { clamp } from '../../../routes/testingArena/classes/utils';
import { axisConstraint } from '../constraints/linearSpace';

export class physicalObject {
	p: P5;
	position: P5.Vector;
	velocity: P5.Vector;
	constraintsList: axisConstraint[] = [];
	forceApplierList: [] = [];

	constructor(p5: P5) {
		this.p = p5;
		this.position = p5.createVector(0, 0);
		this.velocity = p5.createVector(0, 0);
	}

	addLinearSpaceConstraint(linearSpaceConstraint: axisConstraint) {
		this.constraintsList.push(linearSpaceConstraint);
		linearSpaceConstraint.addObject(this);
	}

	// addForceApplier()

	clampPosition() {
		this.constraintsList.forEach((linConstraint: axisConstraint) => {
			for (const lock of [linConstraint.xLock, linConstraint.yLock]) {
				if (!lock.enabled) {
					continue;
				}

				if (lock.type == 'x') {
					this.position.x = clamp(this.position.x, lock.min, lock.max);
				} else {
					this.position.y = clamp(this.position.y, lock.min, lock.max);
				}
			}
		});
	}
}
