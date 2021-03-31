<script lang="ts">
	import { birthDate, expectancy } from "../store/date";
	import { format } from "date-fns";

	const changeDate = (ev) => {
		const date = ev.target.value;
		$birthDate = new Date(date);
	};

	const changeExpectancy = (ev) => {
		const value = ev.currentTarget.value;
		const number = Math.abs(Number(value.replace(/[^0-9]/g, "")) || 60);
		$expectancy = Math.min(number, 150);
	};

	$: formattedDate = format($birthDate, "yyyy-MM-dd");
</script>

<nav>
<div class="space-between">
	<div class="controls">
	<label class="space-right">
		<span>Birth</span>
		<input
			class="date"
			type="date"
			on:input={changeDate}
			value={formattedDate}
		/>
	</label>

	<label>
		<span>Life Expectancy</span>
		<input
			type="number"
			max="150"
			value={$expectancy}
			on:input={changeExpectancy}
		/>
	</label>
	</div>
	<div>
		<a href={`/pdf/${formattedDate}/${$expectancy}`} target="_blank" rel="external">
			<img alt="PDF" src={'pdf.svg'} />
		</a>
	</div>
</div>
</nav>

<style>

	img {
		height: 2rem;
	}

	.controls {
		display: flex;
	}
	.space-between {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	nav {
		border-bottom: 1px solid rgba(80, 80, 80, 0.1);
		padding: 0.5em 1em;
		display: flex;
		align-content: middle;
		font-family: "Open Sans", sans-serif;
	}

	label {
		display: flex;
		align-items: center;
	}

	.space-right {
		margin-right: 2em;
	}
	label > span {
		margin-right: 8px;
	}

	input[type="number"],
	input[type="date"] {
		height: 2rem;
	}
</style>
