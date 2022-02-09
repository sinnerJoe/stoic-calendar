<script lang="ts">
	import { differenceInWeeks, addYears } from "date-fns";
	export let years = 80;
	export let birth = new Date(1996, 11, 1);

	const weeksInYear = 52;

	let yearBlocks: boolean[][][][];

	$: weeksConsumed = differenceInWeeks(new Date(), birth);
	$: weeksTotal = differenceInWeeks(addYears(birth, years), birth);
	$: {
		let weeksLived = weeksConsumed;
		function didExpire() {
			const expired = weeksLived > 0;
			weeksLived--;
			return expired;
		}

		const blocks = Array.from({ length: years })
			.fill(0)
			.map(() => [
				Array.from({ length: weeksInYear / 2 }).map(didExpire),
				Array.from({ length: weeksInYear / 2 }).map(didExpire),
			]);

		const yearStacks = blocks.reduce(
			(acc: boolean[][][][], year) => {
				const lastBlock = acc[acc.length - 1];
				if (lastBlock.length < 5) {
					lastBlock.push(year);
				} else {
					acc.push([year]);
				}

				return acc;
			},
			[[]]
		);

		yearBlocks = yearStacks;
	}
</script>

<div>
	<p>
		You have lived <b>{weeksConsumed}</b> weeks out of <b>{weeksTotal}</b> given to you, <b>{weeksTotal - weeksConsumed}</b> weeks remaining.
	</p>
	{#each yearBlocks as yearBlock, blockNr}
		<div class="year-stack">
			{#each yearBlock as year}
				<div class="year">
					{#each year as halfYear}
						<div class="half-year">
							{#each halfYear as week}
								<div class:full={week} class="block">
									<div class="block-content" />
								</div>
							{/each}
						</div>
					{/each}
				</div>
			{/each}
			<div class="year-marker">
				<span class="year-count">
					{blockNr * 5 + yearBlock.length}
				</span>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.year-stack {
		--cell-space: 2px;
		--middle-space: 10px;	
		position: relative;
		margin-bottom: var(--middle-space);
		> .year-marker {
			position: absolute;
			right: 0;
			bottom: 0;
			> .year-count {
				position: relative;
				right: calc(-100% - 10px);
				top: 4px;
			}
			
			.year-count {
				font-size: 12px;
			}
		}
	}

	.year,
	.half-year {
		display: flex;
		width: 100%;
		margin-bottom: var(--cell-space);
	}

	p {
		color: gray;
		font-size: 0.9em;
	}



	.half-year:last-child {
		margin-left: var(--middle-space);
	}

	.block { 
		transition: background-color 0.5s;
		margin-left: var(--cell-space);
		flex-grow: 1;
		border: 1px solid black;

		&.full {
			background: black;
		}

		.block-content {
			margin-left: 100%;
			width: 100%;
			height: 0;
			padding-bottom: 100%;
		}
	}

	@media (min-width: 640px) {
		.year {
			--cell-space: 4px;
			--middle-space: 30px;
		}
		.year-count {
			font-size: 14px;
		}
		
		.year-stack {
			--middle-space: 15px;
		}
	}
</style>
