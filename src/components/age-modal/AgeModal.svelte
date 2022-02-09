<script>

    import { createEventDispatcher } from 'svelte';
    import Switcher from '@sinnerjoe/svelte-touch-datepicker/src/Switcher.svelte';
    import {portal} from "svelte-portal";
    import {disableScroll, enableScroll} from "@sinnerjoe/svelte-touch-datepicker/src/disable-scroll";

    export let visible = false;
    export let value;

    let lastValue = value;

    const dispatch = createEventDispatcher();

    const YEARS = Array.from({length: 125}).map((_, i) => i + 1); 

    const changeAge = (event) => {
        let {changedData} = event.detail;
        value = changedData + 1;
    }

    function dispatchChange(event){
        toggleVisibility();
        dispatch('change', value);
    }

    function closeModal() {
        value = lastValue;
        toggleVisibility();
    }

    function toggleVisibility () {
        if(!visible) {
            lastValue = value;
            disableScroll();
        } else enableScroll()
        visible = !visible; 
    }


  
  

</script>
{#if visible} 
  <div class="age-modal-popup" use:portal hidden on:scroll|stopPropagation={() => {}} on:mousedown|self={closeModal} >
    <div>
      <div class="touch-date-wrapper">
        <div class='date-line'>Life Expectancy</div>
        <div class="content">
            <div class='touch-date-picker'>
                <Switcher 
                    type='year' 
                    data={YEARS} 
                    selected={value-1} 
                    on:dateChange={changeAge}/>
            </div>  
            <span>
                {value > 1 ? 'years' : 'year'}
            </span>
        </div>
        <div class='touch-date-reset'>
          <button on:click|stopPropagation={dispatchChange}>Ok</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>

.content {
    display: flex;
    justify-content: center;
    align-items: center;
}
.age-modal-popup{
  z-index: 1;
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: rgba(0, 0, 0, 0.3);
  touch-action: pan-down;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.age-modal-popup > div{
  background: var(--svtd-popup-bg-color, white);
  color: var(--svtd-popup-color, black);
  width: 85vw;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  border-radius: var(--svtd-popup-radius, 10px);
}
.touch-date-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--svtd-font-size, 20px);
  padding: 1.5rem;
}

.touch-date-picker {
  display: flex;
  padding: 50px 10px;
  margin: 10px 0;
  overflow: hidden;
}

.touch-date-reset > button {
  width: 100px;
  height: 30px;
  border-radius: 15px;
  border: var(--svtd-border, 1px solid grey);
  outline: none;
  color: var(--svtd-button-color, black);
  background-color: var(--svtd-button-bg-color, transparent);
  box-shadow: var(--svtd-button-box-shadow, none) ;
  font-weight: 300;
}
.touch-date-reset button:active {
  -webkit-transform: scale(0.95);
          transform: scale(0.95);
}

.date-line {
  font-size: 30px;
  font-weight: 300;
}
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->