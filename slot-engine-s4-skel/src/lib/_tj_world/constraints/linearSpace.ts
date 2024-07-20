import type P5 from 'p5';
import { constraints_tj } from './base_Constraint_force';

type axisConstraint_data = { type: 'x' | 'y'; enabled: boolean; min: number; max: number };

export class axisConstraint extends constraints_tj {
	xLock: axisConstraint_data;
	yLock: axisConstraint_data;

	constructor(p5: P5) {
		super(p5);

		this.xLock = { type: 'x', enabled: false, min: -Infinity, max: Infinity };
		this.yLock = { type: 'y', enabled: false, min: -Infinity, max: Infinity };
	}

	// locking and unlocking
	addXlock(min: number, max: number) {
		this.xLock.enabled = true;
		this.xLock.min = min;
		this.xLock.max = max;
	}
	addYlock(min: number, max: number) {
		this.yLock.enabled = true;
		this.yLock.min = min;
		this.yLock.max = max;
	}
	pauseXLock() {
		this.xLock.enabled = false;
	}
	pauseYLock() {
		this.yLock.enabled = false;
	}
	resetLocks() {
		this.xLock = { type: 'x', enabled: false, min: -Infinity, max: Infinity };
		this.yLock = { type: 'y', enabled: false, min: -Infinity, max: Infinity };
	}

	// getting state
	getCurrentState_dynamic(
		which: 'x' | 'y',
		what: 'enabled' | 'min' | 'max'
	): boolean | number | object | undefined {
		let returning: axisConstraint_data;
		switch (which) {
			case 'x':
				returning = this.xLock;
				break;
			case 'y':
				returning = this.yLock;
				break;
			default:
				return undefined;
		}

		switch (what) {
			case 'enabled':
				return returning.enabled;
			case 'min':
				return returning.min;
			case 'max':
				return returning.max;
		}
	}

	// visual
	show(centerLinePosPercnt = 0.5, startPercnt = 0, endPercnt = 1) {
		this.p.push();
		this.p.stroke('orange');

		for (const lock of [this.xLock, this.yLock]) {
			if (!lock.enabled) {
				continue;
			}

			let lineStart: number, lineEnd: number, centerLinePos: number;
			if (lock.type == 'x') {
				lineStart = this.p.lerp(0, this.p.height, startPercnt);
				lineEnd = this.p.lerp(0, this.p.height, endPercnt);
				centerLinePos = this.p.lerp(0, this.p.height, centerLinePosPercnt);
			} else {
				lineStart = this.p.lerp(0, this.p.width, startPercnt);
				lineEnd = this.p.lerp(0, this.p.width, endPercnt);
				centerLinePos = this.p.lerp(0, this.p.width, centerLinePosPercnt);
			}

			this.p.push();

			// min line
			this.p.line(lock.min, lineStart, lock.min, lineEnd);
			// horizontal line
			this.p.line(lock.min, centerLinePos, lock.max, centerLinePos);
			//max line
			this.p.line(lock.max, lineStart, lock.max, lineEnd);

			// GUI texts
			if (this.p.mouseIsPressed) {
				this.p.stroke('white');
				this.p.text('start' + lock.min, lock.min, lineEnd - 20);
				this.p.text(
					'Y location: ' + centerLinePosPercnt,
					(lock.max - lock.min) / 2,
					centerLinePos + 5
				);
				this.p.text('end' + lock.max, lock.max, lineEnd - 20);
			}
			this.p.pop();
		}
	}
}
