<script lang="ts">
	import DatePicker from '@sinnerjoe/svelte-touch-datepicker';
	import {OnlyServer, OnlyClient} from 'utils';
	import {afterUpdate, onDestroy} from 'svelte'
    export let visible = false;
    export let date;
    export let endDate;
    export let startDate;


</script>


<OnlyServer>
    <input
        type="date"
    />
</OnlyServer>
<OnlyClient>
    <DatePicker
        on:confirmDate
        bind:date
        bind:visible
        {endDate}
        {startDate}
    />
</OnlyClient>