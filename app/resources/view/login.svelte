<script lang="ts">
    import Input from "../components/Input.svelte";
    import Layout from "../components/Layout.svelte";
    import { onMount } from "svelte";
    import { csrf_token, old, session } from "lunox/client";
    export let version = {};
    onMount(() => {
        // show message from flashed session
        if (session("message")) {
            alert(session("message"));
        }
    });
</script>

<Layout {version}>
    <form
        action="/login"
        method="post"
        class="flex flex-col max-w-md w-200 mx-auto"
    >
        <input type="hidden" name="_token" value={csrf_token()} />
        <Input
            type="text"
            name="username"
            placeholder="username or email"
            value={old("username")}
        />
        <Input
            type="password"
            name="password"
            placeholder="password"
            value={old("password")}
        />
        <button class="bg-yellow-700 text-white rounded py-2"> LOGIN </button>
    </form>
</Layout>
