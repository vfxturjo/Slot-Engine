import Matter from 'matter-js';
// import p5 from 'p5';
import type { p5 } from 'p5-svelte';

export class Circle {
	body: Matter.Body;

	constructor(x: number, y: number, r: number, world: Matter.World) {
		this.body = Matter.Bodies.circle(x, y, r);
		Matter.World.add(world, this.body);
	}

	show(p: p5) {
		const pos = this.body.position;
		const angle = this.body.angle;

		p.push();
		p.translate(pos.x, pos.y);
		p.rotate(angle);
		p.ellipseMode(p.CENTER);
		p.fill(255, 0, 0);
		p.ellipse(0, 0, this.body.circleRadius * 2);
		p.pop();
	}
}
