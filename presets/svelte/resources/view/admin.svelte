<script lang="ts" context="module">
    export const onServer: OnServer = async (req) => {
        return {
            user: await req.auth().user(),
        };
    };
</script>

<script lang="ts">
    import type User from "app/Model/User";
    import type { OnServer } from "lunox";

    import Layout from "../components/Layout.svelte";
    export let version = {};
    export let user: User;
</script>

<Layout {version}>
    <h2 class="rounded bg-green-400 p-2">Welcome {user?.full_name}</h2>
    <div class="flex justify-center flex-row">
        <a href="/logout" class="p-4 underline">Logout</a>
        <a href="/" class="p-4 underline">Home</a>
    </div>
</Layout>
