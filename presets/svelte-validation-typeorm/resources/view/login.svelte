<script lang="ts" context="module">
export const layout = "layout.base";
</script>

<script lang="ts">
    import { TextInput, InputWrapper } from "$lib/components/ui/input";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Button } from "$lib/components/ui/button";
    import { page, useForm } from "@lunoxjs/view-plugin-svelte";

    const input = useForm({
        username: "",
        password: "",
        remember: false,
    });
    const submit = () => {
        $input.post("/login");
    };
</script>

<svelte:head>
    <title>Lunox | Login</title>
</svelte:head>
<form
    action="/login"
    method="post"
    class="flex flex-col max-w-md w-60 mx-auto gap-4"
    on:submit|preventDefault={submit}
>
    <input type="hidden" name="_token" value={$page?.csrf_token} />
    <TextInput
        type="text"
        name="username"
        label="Username"
        placeholder="username"
        bind:value={$input.username}
        error={$input.errors.username}
    ></TextInput>
    <TextInput
        type="password"
        name="password"
        label="Password"
        placeholder="password"
        bind:value={$input.password}
        error={$input.errors.password}
    />
    <InputWrapper label="Remember me" for="remember_me" labelPosition="end">
        <Checkbox bind:checked={$input.remember} id="remember_me"></Checkbox>
    </InputWrapper>
    <Button type="submit">LOGIN</Button>
</form>
