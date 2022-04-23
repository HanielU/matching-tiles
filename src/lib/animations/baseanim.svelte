<script lang="ts">
	import { browser } from '$app/env';
	import anime, { type AnimeInstance } from 'animejs';
	import { selectAll } from '$lib/utils/helpers';

	const animDuration = 2000;
	const animEasing = 'easeInOutQuad';
	const animDelay = anime.random(0, animDuration);

	let animation: AnimeInstance;

	if (browser)
		animation = anime({
			targets: selectAll('.grid-item'),
			translateY: [
				{ value: 100, duration: animDuration, delay: (el, i) => i * animDelay },
				{ value: 100, duration: animDuration, delay: (el, i) => i * animDelay },
				{ value: 0, duration: animDuration, delay: (el, i) => i * animDelay },
			],
			translateX: [
				{ value: -100, duration: animDuration, delay: (el, i) => i * animDelay },
				{ value: 100, duration: animDuration, delay: (el, i) => i * animDelay },
				{ value: 100, duration: animDuration, delay: (el, i) => i * animDelay },
				{ value: 0, duration: animDuration, delay: (el, i) => i * animDelay },
			],
			rotate: [
				{ value: '1turn', duration: animDuration, delay: (el, i) => i * animDelay },
				{ value: '2turn', duration: animDuration, delay: (el, i) => i * animDelay },
				{ value: '3turn', duration: animDuration, delay: (el, i) => i * animDelay },
				{ value: '4turn', duration: animDuration, delay: (el, i) => i * animDelay },
			],
			loop: true,
			autoplay: false,
		});
</script>

<div class="grid-container">
	{#each Array(9) as element, i}
		<div class="grid-item">
			{i}
		</div>
	{/each}
</div>

<button on:click={animation.play}>Play</button>
<button on:click={animation.restart}>restart</button>
<button on:click={animation.reverse}>reverse</button>
<button on:click={animation.pause}>pause</button>

<style lang="scss">
	// make the grid container have a height of 700px and a width of 700px, also make it have a border of 1px solid black
	.grid-container {
		height: 700px;
		width: 700px;
		border: 1px solid black;
		margin: auto;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-items: center;
		align-items: center;
	}

	.grid-item {
		// make the grid item have a height of 100px and a width of 100px
		height: 200px;
		width: 200px;
		border: 1px solid black;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
</style>
