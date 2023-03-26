<script lang="ts">
    import Input from "../components/Input.svelte";
    import Layout from "../components/Layout.svelte";
    import { onMount } from "svelte";
    import { csrf_token, old, session } from "@lunox/view/client";
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
            name="user_name"
            placeholder="username or email"
            value={old("user_name")}
        />
        <Input
            type="password"
            name="password"
            placeholder="password"
            value={old("password")}
        />
        <div class="mb-3">
            <input type="checkbox" name="remember" placeholder="remember me" />
            <label for="remember" class="text-sm text-gray-800"
                >Remember me</label
            >
        </div>
        <button class="bg-yellow-700 text-white rounded py-2"> LOGIN </button>
    </form>
</Layout>
