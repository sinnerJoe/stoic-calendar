<script>
	import { expectancy, birthDate } from "../store/date";
	import FullCalendar from "components/calendar/FullCalendar.svelte";
</script>

<svelte:head>
	<title>Stoic Calendar</title>
</svelte:head>

<h1>MEMENTO MORI</h1>

<FullCalendar years={$expectancy} birth={$birthDate} />

<div class="quote-container">
	<p class="quote">
		"It is not that we have a short time to live, but that we waste a lot of it.
		Life is long enough, and a sufficiently generous amount has been given to us
		for the highest achievements if it were all well invested."
		<br />
	</p>
	<p class="author">- Seneca</p>
</div>

<style>
	h1,
	figure {
		text-align: center;
		margin: 0 auto;
	}

	.quote {
		font-style: italic;
	}

	@media (max-width: 1050px) {
		.quote-container {
			padding-bottom: 3em;
		}
	}

	.author {
		margin-top: 0.5em;
		font-weight: 700;
	}

	h1 {
		font-family: "Amatic SC";
	}

	p {
		/* font-family: "Permanent Marker", cursive; */
		font-family: "Open Sans", sans-serif;
		margin-bottom: 0;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
