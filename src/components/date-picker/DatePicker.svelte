<script lang="ts">
  import DatePicker from "@sinnerjoe/svelte-touch-datepicker";
  export let visible = false;
  export let date;
  export let endDate;
  export let startDate;
</script>

<DatePicker on:confirmDate bind:date bind:visible {endDate} {startDate} />
