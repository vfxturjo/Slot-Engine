<script lang="ts">
	import { testing_things } from '$lib/_tj_world/constraints/testingConstructor';

	let a = new testing_things({
		thing1: 20
	});

	console.log(a.thing1);
	console.log(a.thing2);
	console.log(a.thing3);
</script>
