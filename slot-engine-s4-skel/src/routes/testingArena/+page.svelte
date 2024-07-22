<script lang="ts">
	import type P5 from 'p5';
	import * as knobby from '@thenbe/svelte-knobby';

	import { onMount } from 'svelte';
	import { constraint_AxisLock } from '$lib/_tj_world/constraints/constraint_axisLock';
	import { box } from '$lib/_tj_world/objects/box';
	import { mouseAttractor } from '$lib/_tj_world/constraints/force_mouseAttract';
	import { objectAttractorSingle } from '$lib/_tj_world/constraints/force_attract';
	import { physicalObject } from '$lib/_tj_world/objects/physicalObject';

	// sketch related variables
	let sketchP5: P5;
	let anchorTag: HTMLElement;

	// things in sketch
	// constraints
	let axisConstraint1: constraint_AxisLock;
	let mouseAttractor1: mouseAttractor;
	let objectAttractorSingle1: objectAttractorSingle;

	// objects
	let physicalObjects_list: physicalObject[] = [];
	let box1: box;
	let box2: box;

	// sketch setup and draw function
	const sketch1 = (p5: P5) => {
		p5.setup = () => {
			// Your setup function
			p5.createCanvas(1000, 500);
		};

		p5.draw = () => {
			p5.background(0);

			axisConstraint1.show();
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

		// objects
		box1 = new box(sketchP5, 0, 0, 30);
		box1.color = 255;

		box2 = new box(sketchP5, 100, 100, 30);
		box2.color = 170;

		physicalObjects_list.push(box1, box2);

		// forces and constraints
		mouseAttractor1 = new mouseAttractor(sketchP5);
		objectAttractorSingle1 = new objectAttractorSingle(sketchP5, box1, -10, true);

		box1.addLinearSpaceConstraint(axisConstraint1);
		box1.addForceApplier(mouseAttractor1);

		box2.addLinearSpaceConstraint(axisConstraint1);
		box2.addForceApplier(objectAttractorSingle1);

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
		updateForce: () => {
			mouseAttractor1.forceMultiplier = $opts.forceMultiplier;
		},
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
