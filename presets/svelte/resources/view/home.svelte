<script lang="ts">
    import HomeCard from "../components/HomeCard.svelte";
    import Layout from "../components/Layout.svelte";

    const cardItems = [
      {
        title: "Documentation",
        url: "https://kodepandai.github.io/lunox/",
        icon: "i-ant-design-read-outlined",
        description:
                "Lunox is Laravel-Flavoured NodeJs Framework. We trying to support all basic Laravel features but we make it as simple as possible. Please read full Documentation for detail. \n NOTE: <i>documentation still in progress</i>",
      },
      {
        title: "Vite",
        url: "https://vitejs.dev/",
        icon: "i-file-icons-vite",
        description:
                "Lunox use vite as frontend tooling. This page is build using svelte plugin vite. We will add support for other frontend framework later. For more information about vite, please visit their official website",
      },
      {
        title: "Laravel",
        url: "https://laravel.com/",
        icon: "i-file-icons-laravel",
        description:
                "Lunox is inspired by Laravel, so if you are not familiar with Laravel (PHP Framework). You can check official website for more detail.",
      },
      {
        title: "Contribution or Open Issue",
        url: "https://github.com/kodepandai/lunox-framework",
        icon: "i-ant-design-question-circle-outlined",
        description:
                "Lunox is under highly developing state. Some problems or breaking change may occure. Please create new issue on github if you have problems or questions. PR are welcome :)",
      },
    ];

    export let version = {};
    export let data = {};
    export let authenticated: boolean;

    let count = 0;
</script>

<svelte:head>
    <title>Lunox</title>
</svelte:head>

<Layout {version}>
    <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="flex items-center flex-nowrap">
            <img src="/images/logo.svg" alt="Lunox" width="60px" />
            <h1 class="text-6xl font-bold  ml-3">
                <span>Lu</span><span class="text-yellow-600">nox</span>
            </h1>
        </div>
        <button
            class="rounded bg-yellow-600 p-2 text-white shadow"
            on:click={() => count++}
        >
            clicked {count} times
        </button>
    </div>

    <div
        class="flex flex-row flex-wrap g mt-10 bg-white shadow rounded-md flex-grow overflow-hidden"
    >
        {#each cardItems as { icon, description, title, url }, index}
            <HomeCard {index} {icon} {title} {description} {url} />
        {/each}
    </div>
    <div class="w-full flex justify-center py-3 text-yellow-600 font-bold">
        {#if authenticated}
            <a href="/admin">Dashboard</a>
        {:else}
            <a href="/login">Login Now</a>
        {/if}
    </div>

    {#if data && Object.keys(data).length > 0}
        <pre class="mt-5 rounded bg-gray-300 p-3">
            data: {JSON.stringify(data, null, 2)}
        </pre>
    {/if}
</Layout>
