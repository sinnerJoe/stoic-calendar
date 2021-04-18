<script lang="ts">
	import DatePicker from 'svelte-touch-datepicker';
	import {OnlyServer, OnlyClient} from 'utils';
	import {afterUpdate, onDestroy} from 'svelte'
    export let visible = false;
    export let years_map;
    export let date;
    afterUpdate(() => {
			if(visible) {
				document.body.style.overflow = 'hidden';
                const resetButton: any = document.querySelector('.touch-date-reset > button:first-child');
                if (resetButton) {
                    resetButton.style.display = 'none';    
                }
			} else {
				document.body.style.overflow = '';
			}
	})
    
    onDestroy(() => {
        if ((process as any).browser) {
            document.body.style.overflow = '';
        }
    })


</script>


<OnlyServer>
    <input
        type="date"
    />
</OnlyServer>
<OnlyClient>
    <DatePicker
        years_map={years_map}
        on:confirmDate
        bind:date
        bind:visible
    />
</OnlyClient>