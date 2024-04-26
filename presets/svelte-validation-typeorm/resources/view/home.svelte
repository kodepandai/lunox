<script lang="ts" context="module">
    export const layout = "layout.base";
</script>

<script lang="ts">
    import HomeCard from "$lib/components/HomeCard.svelte";
    import { Button } from "$lib/components/ui/button";

    const cardItems = [
        {
            title: "Documentation",
            url: "https://kodepandai.github.io/lunox/",
            icon: "icon-[ant-design--read-outlined]",
            description:
                "Lunox is Laravel-Flavoured NodeJs Framework. We trying to support all basic Laravel features but we make it as simple as possible. Please read full Documentation for detail. \n NOTE: <i>documentation still in progress</i>",
        },
        {
            title: "Vite",
            url: "https://vitejs.dev/",
            icon: "icon-[file-icons--vite]",
            description:
                "Lunox use vite as frontend tooling. This page is build using svelte plugin vite. We will add support for other frontend framework later. For more information about vite, please visit their official website",
        },
        {
            title: "Laravel",
            url: "https://laravel.com/",
            icon: "icon-[file-icons--laravel]",
            description:
                "Lunox is inspired by Laravel, so if you are not familiar with Laravel (PHP Framework). You can check official website for more detail.",
        },
        {
            title: "Contribution or Open Issue",
            url: "https://github.com/kodepandai/lunox",
            icon: "icon-[ant-design--question-circle-outlined]",
            description:
                "Lunox is under highly developing state. Some problems or breaking change may occure. Please create new issue on github if you have problems or questions. PR are welcome :)",
        },
    ];

    let count = 0;
</script>

<svelte:head>
    <title>Lunox</title>
</svelte:head>

<Button class="mx-auto" on:click={() => count++}>clicked {count} times</Button>

<div
    class="flex flex-row flex-wrap g mt-10 bg-white shadow rounded-md flex-grow overflow-hidden"
>
    {#each cardItems as { icon, description, title, url }, index}
        <HomeCard {index} {icon} {title} {description} {url} />
    {/each}
</div>
