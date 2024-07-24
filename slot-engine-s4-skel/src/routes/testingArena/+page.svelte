<script lang="ts">
	import type P5 from 'p5';
	import * as knobby from '@thenbe/svelte-knobby';

	import { onMount } from 'svelte';
	import { constraint_AxisLock } from '$lib/_tj_world/constraints/constraint_axisLock';
	import { box } from '$lib/_tj_world/objects/box';
	import { mouseAttractor } from '$lib/_tj_world/constraints/force_mouseAttract';
	import { objectAttractorSingle } from '$lib/_tj_world/constraints/force_attract';
	import { physicalObject } from '$lib/_tj_world/objects/physicalObject';
	import { constraint_mouseLock } from '$lib/_tj_world/constraints/constraint_mouseLock';

	// sketch related variables
	let sketchP5: P5;
	let anchorTag: HTMLElement;

	// things in sketch
	// constraints
	let axisConstraint1: constraint_AxisLock, axisConstraint2: constraint_AxisLock;
	let mouseLock1: constraint_mouseLock;
	let objectAttractorSingle1: objectAttractorSingle;
	let objectAttractorSingle2: objectAttractorSingle;

	// objects
	let physicalObjects_list: physicalObject[] = [];
	let box1: box;
	let box2: box;
	let box3: box;

	// sketch setup and draw function
	const sketch1 = (p5: P5) => {
		p5.setup = () => {
			// Your setup function
			p5.createCanvas(1000, 500);
		};

		p5.draw = () => {
			p5.background(0);
			mouseLock1.show();
			axisConstraint1.show();
			axisConstraint2.show(0.5, 0, 1, 'red');
			// objectAttractorSingle1.show();

			// mouseAttractor1.show();

			physicalObjects_list.forEach((obj: physicalObject) => {
				obj.step_physics();
				obj.show();
			});
		};
	};

	// sketch event handlers
	function addEventHandlers() {
		sketchP5.mouseClicked = (e: MouseEvent) => {
			// console.log(e);
		};
	}

	///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////

	// loading the sketch
	onMount(async () => {
		let p5 = (await import('p5')).default;
		sketchP5 = new p5(sketch1, anchorTag);
		addEventHandlers();

		axisConstraint1 = new constraint_AxisLock(sketchP5);
		axisConstraint1.addXlock(10, sketchP5.width - 10);
		axisConstraint1.addYlock(10, sketchP5.height - 10);
		axisConstraint2 = new constraint_AxisLock(sketchP5);
		axisConstraint2.addXlock(20, sketchP5.width - 20);
		axisConstraint2.addYlock(20, sketchP5.height - 20);

		// objects
		box1 = new box(sketchP5, 0, 0, 30);
		box1.color = 255;

		box2 = new box(sketchP5, 100, 100, 30);
		box2.color = 170;

		box3 = new box(sketchP5, 100, 200, 30);
		box3.color = 170;

		physicalObjects_list.push(box1, box2, box3);

		// forces and constraints
		mouseLock1 = new constraint_mouseLock(sketchP5);
		objectAttractorSingle1 = new objectAttractorSingle(
			sketchP5,
			box1,
			1,
			false,
			false,
			100,
			1000,
			1,
			true
		);
		objectAttractorSingle2 = new objectAttractorSingle(
			sketchP5,
			box3,
			1,
			false,
			false,
			100,
			1000,
			1,
			true
		);

		box1.addSpaceConstraint(axisConstraint1);
		box1.addConstraint(mouseLock1);

		box2.addConstraint(axisConstraint2);
		box2.addForceApplier(objectAttractorSingle1);
		box2.debugAppliedForces = true;

		box2.addForceApplier(objectAttractorSingle2);

		// console.log(sketchP5);
	});

	// knobby things
	const opts = knobby.panel({
		yLineLoc: { value: 0.5, min: 0, max: 1, step: 0.01 },
		min: { value: 10, min: 0, max: 1000, step: 1 },
		max: { value: 10, min: 0, max: 1000, step: 1 },
		updateRange: () => {
			axisConstraint1.xLock.min = $opts.min;
			axisConstraint1.xLock.max = $opts.max;
		},
		forceMultiplier: { value: 0.5, min: 0, max: 1, step: 0.01 },
		updateForce: () => {},
		height: { value: 55, min: 100, max: 1000 },
		speed: { value: 1, min: 0.01, max: 10, step: 0.1 },
		color: '#ff3e00',

		toggleUpdate: () => {
			sketchP5.isLooping() ? sketchP5.noLoop() : sketchP5.loop();
		},
		addYconstraint: () => {},
		logObjects: () => {
			axisConstraint1.logObjects();
		}
	});

	console.log($opts.width);
</script>

<!-- <input type="range" min="0" max="255" bind:value={opacity} /> -->
<div class="bg-black" bind:this={anchorTag}></div>
