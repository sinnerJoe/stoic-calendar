<script lang="ts">
	import { birthDate, expectancy } from "../store/date";
	import DatePicker from "components/date-picker/DatePicker.svelte";
	import { format, sub } from "date-fns";
	import FloatingMenu from "./floating-menu/FloatingMenu.svelte";
    import pdfIcon from '../node_modules/images/pdf.svg';
	import AgeModal from "./age-modal/AgeModal.svelte";
	import OnlyClient from "../utils/OnlyClient.svelte";


	let visible = false;
	let visibleAgeModal = false;

	const changeDate = (ev) => {
		const date = ev.detail.date;
		$birthDate = new Date(date);
	};

	const changeExpectancy = (ev) => {
		const value = ev.currentTarget.value;
		const number = Math.abs(Number(value.replace(/[^0-9]/g, "")) || 60);
		$expectancy = Math.min(number, 150);
	};


	function openDatePicker() {
		visible = true;
	}


	const startDate = sub(new Date(), {years: 100});
	const endDate = sub(new Date(), {years: 5});


	$: formattedDate = format($birthDate, "yyyy-MM-dd");
	$: pdfUrl = `/pdf/${formattedDate}/${$expectancy}/stoic-calendar`;

	function visitPDFUrl() {
		window.open(pdfUrl)
	}

	function modalChangeExpectancy({detail: age}) {
		$expectancy = age;
	}

	function openAgePicker() {
		visibleAgeModal = true;
	}


</script>

<nav>
<div class="space-between">
	<div class="controls">
	<label class="space-right datepicker-container">
		<span>Birth</span>
		<DatePicker bind:visible={visible} startDate={startDate} endDate={endDate} date={$birthDate} on:confirmDate={changeDate} />
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
		<a href={pdfUrl} target="_blank" rel="external">
			<img alt="PDF" src={pdfIcon} />
		</a>
	</div>
</div>
</nav>

<AgeModal bind:visible={visibleAgeModal} on:change={modalChangeExpectancy} value={$expectancy} />
<OnlyClient>
	<FloatingMenu on:clickBirthEntry={openDatePicker} on:clickDownload={visitPDFUrl} on:clickExpectancy={openAgePicker} />
</OnlyClient>

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

		nav {
			display: none;
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
