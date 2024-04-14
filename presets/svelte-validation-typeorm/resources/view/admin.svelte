<script lang="ts" context="module">
    import type { OnServer } from "@lunoxjs/core/contracts";
    import type User from "app/Model/User";
    export { default as layout } from "$lib/components/Layout.svelte";
    export const onServer: OnServer = async (req) => {
        const user = (await req?.auth().user()) as User;
        return {
            full_name: user.full_name,
        };
    };
</script>

<script lang="ts">
    import { Link } from "@lunoxjs/view-plugin-svelte";
    export let full_name: string;
</script>

<svelte:head>
    <title>Lunox | Dashboard</title>
</svelte:head>
<h2 class="rounded bg-green-400 p-2">Welcome {full_name}</h2>
<div class="flex justify-center flex-row">
    <Link href="/logout" class="p-4 underline">Logout</Link>
    <Link href="/" class="p-4 underline">Home</Link>
</div>
