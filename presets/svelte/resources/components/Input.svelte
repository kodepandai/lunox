<script lang="ts">
    export let type: "text" | "password";
    export let name: string;
    export let placeholder: string;
    export let value: string;
    import { errors } from "@lunoxjs/view/client";
</script>

<div class="mb-3 flex flex-col">
    <label for={name} class="text-sm text-gray-800">{name}</label>
    <input
        {value}
        {type}
        {name}
        class="border border-yellow-200 p-2 rounded focus:outline-yellow"
        {placeholder}
    />
    {#if errors(name)}
        <small class="text-red">{errors(name).message} </small>
    {/if}
</div>
