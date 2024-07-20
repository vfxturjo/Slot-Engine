import Matter from 'matter-js';

import type { p5 } from 'p5-svelte';

export class Ground {
	body: Matter.Body;

	constructor(x: number, y: number, width: number, height: number, world: Matter.World) {
		this.body = Matter.Bodies.rectangle(x, y, width, height, { isStatic: true });
		Matter.World.add(world, this.body);
	}

	show(p: p5) {
		const pos = this.body.position;
		const angle = this.body.angle;

		p.push();
		p.translate(pos.x, pos.y);
		p.rotate(angle);
		p.rectMode(p.CENTER);
		p.fill(128);
		p.rect(
			0,
			0,
			this.body.bounds.max.x - this.body.bounds.min.x,
			this.body.bounds.max.y - this.body.bounds.min.y
		);
		p.pop();
	}
}
