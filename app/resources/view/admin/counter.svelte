<script lang="ts">
    export let count: number = 0;
    const increment = () => {
        count++;
    };
</script>

<p>
    count: {count}
</p>
<button on:click={increment} class="button">ADD</button>

<style>
    .button {
        cursor: pointer;
        border-radius: 0.25rem;
        color: white;
        background-color: rgb(123, 63, 146);
        border: 1px solid #333;
        padding: 0.25rem 0.5rem;
    }
</style>
