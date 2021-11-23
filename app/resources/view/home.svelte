<script lang="ts">
    let title: string = "WORLD";
</script>

<p>HELLO {title}</p>

<svelte:head>
    <title>Home</title>
</svelte:head>
<button on:click={() => (title = "SVELTE COMPONENT")}>CHANGE TITLE</button>
