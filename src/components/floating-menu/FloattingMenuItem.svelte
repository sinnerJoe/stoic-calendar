<script lang="ts">
    import {tweened} from 'svelte/motion';
    import {onMount} from 'svelte'

    export let src;
    export let distance;
    export let animationDuration;
    export let label = '';
    let className = '';
    export { className as class };

    let labelWidth = '2em';

    let labelElement: HTMLDivElement;

    onMount(() => {
        labelWidth = labelElement.clientWidth + 'px';
    })


    $: labelStyle = `
        left: calc(calc(-0.5em) - ${labelWidth});
       `;

    // $: currentDistance.set(distance);
    $: style = `
        transform: translateY(-${distance}px);
        transition: transform ${animationDuration}ms, opacity ${animationDuration * 0.8}ms;
        opacity: ${Number(!!distance)};
        pointer-events: ${distance ? 'auto': 'none'}
    `
</script>

<div on:click|stopPropagation class="floating" {style}>
    <div class="flex">
        <img class={`${className} bubble`} {src} alt={label}/>
        <span style={labelStyle} class="label floating" bind:this={labelElement}>
            {label}
        </span>
    </div>
</div>
<style>
    /* your styles go here */
    .floating {
        position: absolute;
        cursor: pointer;
    }
    .label {
        font-weight: bold;
        bottom: calc(var(--bubble-width) / 2 - 5px);
        border-radius: 6px;
        white-space: nowrap;
        background-color: white;
        border: 1px solid rgb(117, 117, 117);
        padding: 2px 6px;
    }
    .flex {
        display: flex;
    }
</style>
