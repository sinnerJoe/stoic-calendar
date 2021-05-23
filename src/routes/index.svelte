<script>
	import { expectancy, birthDate } from "../store/date";
	import FullCalendar from "components/calendar/FullCalendar.svelte";
	import {getRandomQuote} from "../store/quotes";


	$: quote = getRandomQuote();
	$: quoteFragments = `"${quote.quote}"`.split('\n');
</script>

<svelte:head>
	<title>Stoic Calendar</title>
</svelte:head>

<h1>MEMENTO MORI</h1>

<FullCalendar years={$expectancy} birth={$birthDate} />

<div class="quote-container" >
	<p class="quote">
		{#each quoteFragments as fragment}
		<div class='quote-fragment'>
			{fragment}
		</div> 
		{/each}
	</p>
	<p class="author">- {quote.author}</p>
</div>

<style>
	h1,
	figure {
		text-align: center;
		margin: 0 auto;
	}

	.quote {
		font-style: italic;
		margin-bottom: 1em;
	}

	@media (max-width: 1050px) {
		.quote-container {
			padding-bottom: calc(calc(var(--bubble-width) / 2) + var(--bubble-space-bottom));
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
