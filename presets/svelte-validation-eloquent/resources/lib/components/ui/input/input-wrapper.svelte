<script lang="ts">
    import Label from "$lib/components/ui/label/label.svelte";
    export let labelPosition: "first" | "end" = "first";
    export let label: string | undefined = undefined;
    export let required: boolean | null | undefined = undefined;
    export let error: string | undefined = undefined;
    let htmlFor: string | undefined | null = undefined;
    export { htmlFor as for };
</script>

<div>
    {#if labelPosition == "first" && label}<Label for={htmlFor}>{label}</Label
        >{/if}
    {#if required}
        <i class="text-destructive">*</i>
    {/if}
    <slot />
    {#if labelPosition == "end" && label}<Label for={htmlFor}>{label}</Label
        >{/if}
    {#if error}
        <span class="text-xs text-destructive">{error}</span>
    {/if}
</div>
