<script lang="ts" context="module">
    export const layout = "layout.base";
</script>

<script lang="ts">
    import { Link } from "@lunoxjs/view-plugin-svelte";
    import User from "app/Model/User";
    export let user: User;
</script>

<svelte:head>
    <title>Lunox | Dashboard</title>
</svelte:head>
<h2 class="rounded bg-green-400 p-2">Welcome {user.full_name}</h2>
<div class="flex justify-center flex-row">
    <Link href="/logout" class="p-4 underline">Logout</Link>
    <Link href="/" class="p-4 underline">Home</Link>
</div>
