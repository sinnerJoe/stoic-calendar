<script lang="ts">
	$: isServer = !!(process as any).browser
</script>


{#if !isServer}
	<slot></slot>
{/if}