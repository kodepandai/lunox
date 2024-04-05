<script lang="ts" context="module">
    export { default as layout } from "../components/Layout.svelte";
</script>

<script lang="ts">
    import Input from "../components/Input.svelte";
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
    class="flex flex-col max-w-md w-200 mx-auto"
    on:submit|preventDefault={submit}
>
    <input type="hidden" name="_token" value={$page?.csrf_token} />
    <Input
        type="text"
        name="username"
        placeholder="username or email"
        bind:value={$input.username}
    />
    <Input
        type="password"
        name="password"
        placeholder="password"
        bind:value={$input.password}
    />
    <div class="mb-3">
        <input
            type="checkbox"
            name="remember"
            placeholder="remember me"
            bind:checked={$input.remember}
        />
        <label for="remember" class="text-sm text-gray-800">Remember me</label>
    </div>
    <button class="bg-yellow-700 text-white rounded py-2"> LOGIN </button>
</form>
