import Matter from 'matter-js';
let Engine = Matter.Engine,
	Events = Matter.Events,
	Runner = Matter.Runner,
	Render = Matter.Render,
	World = Matter.World,
	Body = Matter.Body,
	Mouse = Matter.Mouse,
	Common = Matter.Common,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite,
	Composites = Matter.Composites;

export function createMatterScene(engine: Matter.Engine) {
	// Create a ground
	const ground = Matter.Bodies.rectangle(400, 590, 800, 20, {
		isStatic: true,
		render: {
			fillStyle: '#2e2b44'
		}
	});

	// Add ground to the world
	Matter.Composite.add(engine.world, ground);
}

export function addMouseControl(engine: Matter.Engine, canvas: HTMLCanvasElement) {
	// add mouse control
	const mouse = Matter.Mouse.create(canvas),
		mouseConstraint = Matter.MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		});

	Matter.Composite.add(engine.world, mouseConstraint);
	return [mouse, mouseConstraint];
}

export function addRandomBodies(engine: Matter.Engine) {
	// add bodies
	const stack = Composites.stack(20, 20, 10, 5, 0, 0, function (x, y) {
		const sides = Math.round(Common.random(1, 8));

		// round the edges of some bodies
		let chamfer = null;
		if (sides > 2 && Common.random() > 0.7) {
			chamfer = {
				radius: 10
			};
		}

		switch (Math.round(Common.random(0, 1))) {
			case 0:
				if (Common.random() < 0.8) {
					return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), {
						chamfer: chamfer
					});
				} else {
					return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), {
						chamfer: chamfer
					});
				}
			case 1:
				return Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer: chamfer });
		}
	});

	Composite.add(engine.world, stack);
}

export function createMatterAttractorScene(
	engine: Matter.Engine,
	mouse: Matter.Mouse,
	attractorStrength = 1e-6,
	MouseFollowerSpeed = 0.25,
	areaPower = 0
) {
	const attractiveBody = Bodies.circle(100, 100, 50, {
		isStatic: true,

		// example of an attractor function that
		// returns a force vector that applies to bodyB
		plugin: {
			attractors: [
				function (bodyA: Matter.Body, bodyB: Matter.Body) {
					return {
						// x: (bodyA.position.x - bodyB.position.x) * 1e-6,

						x:
							(bodyA.position.x - bodyB.position.x) *
							attractorStrength *
							Math.pow(bodyA.area, areaPower),
						y:
							(bodyA.position.y - bodyB.position.y) *
							attractorStrength *
							Math.pow(bodyA.area, areaPower)
					};
				}
			]
		}
	});

	// ADD THE ATTRACTOR
	World.add(engine.world, attractiveBody);

	// ON MOUSE MOVE
	Events.on(engine, 'afterUpdate', function () {
		if (!mouse.position.x) {
			return;
		}

		// smoothly move the attractor body towards the mouse
		Body.translate(attractiveBody, {
			// x: (mouse.position.x - attractiveBody.position.x) * 0.25
			x: (mouse.position.x - attractiveBody.position.x) * MouseFollowerSpeed,
			y: (mouse.position.y - attractiveBody.position.y) * MouseFollowerSpeed
		});
	});
}
