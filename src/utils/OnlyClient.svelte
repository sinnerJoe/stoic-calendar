<script lang="ts">
	$: isBrowser = !!(process as any).browser
</script>


{#if isBrowser}
<slot></slot>
{/if}