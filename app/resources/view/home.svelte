<script lang="ts">
    // get data from view using export let
    export let message: string;
    const changeMessage = () => (message = "It's Works");
</script>

<h1>{message}</h1>

<svelte:head>
    <title>Home</title>
</svelte:head>
<button on:click={changeMessage}>CHANGE MESSAGE</button>
