<script lang="ts">
    import InputWrapper from "./input-wrapper.svelte";
    import { Input } from "$lib/components/ui/input";
    import { ComponentProps } from "svelte";
    interface $$Props extends ComponentProps<Input> {
        error?: string;
        label?: string;
    }
	export let value: $$Props["value"] = undefined;
    export let name: $$Props["name"] = "";
    export let required: $$Props["required"] = false;
    export let error: string = "";
    export let label: string = "";
</script>

<InputWrapper {...$$restProps} for={name} {required} {error} {label}>
    <Input {required} {...$$restProps} {name} bind:value/>
</InputWrapper>
