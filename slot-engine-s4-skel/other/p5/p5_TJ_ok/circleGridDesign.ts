import type P5 from 'p5';

export class circleGridDesign {
	p: P5;
	width = 10;
	height = 10;
	color = 0;
	max_distance: number;
	currentTime = 0;
	ipos = 0;
	jpos = 0;

	// force = this.p.createVector (0,0);
	position: P5.Vector;
	force: P5.Vector;
	velocity: P5.Vector;
	forceMultiplier = 0.05;

	constructor(p5: P5, posX: number = 0, posY: number = 0, color: number = 0) {
		this.p = p5;
		this.color = color;

		this.position = this.p.createVector(posX, posY);
		this.force = this.p.createVector(0, 0);
		this.velocity = this.p.createVector(0, 0);

		this.max_distance = p5.dist(0, 0, this.p.width, this.p.height);
	}

	show() {
		this.p.push();
		this.currentTime = (this.currentTime + this.p.deltaTime / 50) % 20;

		// draw function
		for (let i = -20; i <= this.p.width; i += 20) {
			this.ipos = i + this.currentTime;
			for (let j = -20; j <= this.p.height; j += 20) {
				this.jpos = j + this.currentTime;
				let size = this.p.dist(this.position.x, this.position.y, this.ipos, this.jpos);

				size = (size / this.max_distance) * 66;
				this.p.ellipse(this.ipos, this.jpos, size, size);
			}
		}

		this.p.pop();
	}

	follow(x: number, y: number) {
		this.force.x = x - this.position.x;
		this.force.y = y - this.position.y;

		this.velocity = this.force.mult(this.forceMultiplier);
		this.position.add(this.velocity);
	}
}
