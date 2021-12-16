<script lang="ts">
    // get data from view using export let
    export let message: string;
    export let data: any;
    let showData = false;
    const changeMessage = () => (message = "It's Works");
</script>

<h1>{message}</h1>

<svelte:head>
    <title>Home</title>
</svelte:head>

<button on:click={changeMessage}>CHANGE MESSAGE</button>

<button on:click={() => (showData = true)}>SHOW DATA</button>
<p>data from request:</p>
{#if showData}
    <pre>
    {JSON.stringify(data)}
</pre>
{/if}
