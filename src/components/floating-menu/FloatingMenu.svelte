<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import Item from './FloattingMenuItem.svelte';
    import timeIcon from '../../node_modules/images/fast-time.svg';
    import bornIcon from '../../node_modules/images/newborn.svg';
    import verticalMenuIcon from '../../node_modules/images/vertical-menu.svg';
    import pdfIcon from '../../node_modules/images/pdf.svg';

    let animationCoeff = 0;
    const menuMarginTop = 15;
    const menuItemSpace = 75;

    const dispatcher = createEventDispatcher();

    function toggleOpen() {
        animationCoeff = Number(!animationCoeff);
    }

    function clickExpectancy() {
        dispatcher('clickExpectancy');
    }
    function clickDownload() {
        dispatcher('clickDownload');
    }
    function clickBirthEntry() {
        dispatcher('clickBirthEntry');
    }
</script>

<div class="floating">
    <div class="relative">
        <div on:click={toggleOpen} class="menu-toggle bubble">
            <img src={verticalMenuIcon}  alt="Menu" />
        </div>
        <Item on:click={clickBirthEntry} src={bornIcon} label="Birth Date" distance={animationCoeff * (menuMarginTop + menuItemSpace * 1)} animationDuration={200}/>
        <Item on:click={clickExpectancy} src={timeIcon} label="Life Expectancy" distance={animationCoeff * (menuMarginTop + menuItemSpace * 2)} animationDuration={200} />
        <Item 
            on:click={clickDownload} 
            class="grayscale" 
            src={pdfIcon} 
            label="Download PDF" 
            distance={animationCoeff * (menuMarginTop + menuItemSpace * 3)} 
            animationDuration={200} />
    </div>
</div>

<style lang="scss">

@media (min-width: 600) {
    .for-mobile {
        display: none;
    }
}

.floating {
    width: var(--bubble-width);
    position: fixed;
    overflow: visible;
    // right: 4em;
    right: clamp(2em, 15vw, 5.5em);
    z-index: 1;
    bottom: clamp(2em, 8vh, 5.5em);
    padding-bottom: var(--bubble-space-bottom);
    :global(.grayscale) {
        filter: grayscale(1);
    }
}


.menu-toggle {
    z-index: 1;
    border-radius: 50%;
    position: absolute;
    padding: 0.5em;
    box-shadow: var(--bubble-shadow);
    img {
        height: 100%;
        margin: 0 auto;
        display: block;
        transform: scale(0.8);
    }
}

</style>
