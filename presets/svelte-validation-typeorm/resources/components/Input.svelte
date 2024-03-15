<script lang="ts">
    export let name: string;
    export let label: string = "";
    export let placeholder: string;
    export let value: string;
    export let type: string = "text";
    import { page } from "@lunoxjs/view-plugin-svelte";

    // this is workaround, svelte 4 doesnt support dynamic type when using two way binding
    const setType = (node:any) => {
        node.type = type;
    };
</script>

<div class="mb-3 flex flex-col">
    <label for={name} class="text-sm text-gray-800">{label || name}</label>
    <input
        use:setType
        bind:value
        {name}
        class="border border-yellow-200 p-2 rounded focus:outline-yellow"
        {placeholder}
    />
    {#if $page?.props.errors?.[name]}
        <small class="text-red">{$page.props.errors[name].message} </small>
    {/if}
</div>
