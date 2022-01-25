<script lang="ts">
    import HomeCard from "../components/HomeCard.svelte";

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
    export let VERSION = {
        app: "",
        framework: "",
    };
</script>

<svelte:head>
    <title>Lunox</title>
</svelte:head>

<div class="bg-gray-100 min-h-screen relative">
    <main
        class="mx-auto container py-10 xl:px-30 lg:px-10 px-4 font-sans pb-15"
    >
        <div class="flex flex-row items-center">
            <img src="/images/logo.svg" alt="Lunox" width="60px" />
            <h1 class="text-6xl font-bold  ml-3">
                <span>Lu</span><span class="text-yellow-600">nox</span>
            </h1>
        </div>

        <div
            class="flex flex-row flex-wrap g mt-10 bg-white shadow rounded-md flex-grow overflow-hidden"
        >
            {#each cardItems as { icon, description, title, url }, index}
                <HomeCard {index} {icon} {title} {description} {url} />
            {/each}
        </div>

        <footer
            class="absolute bottom-0 mb-5 left-0 right-0 px-10 text-gray-500 flex flex-row justify-between text-sm font-sans"
        >
            <a
                class="flex flex-row items-center text-gray-500"
                href="https://github.com/kodepandai/lunox"
            >
                <div class="i-ant-design-github-filled text-xl mr-1" />
                <span>kodepandai/lunox</span>
            </a>
            <div>
                Lunox v.{VERSION.app}(framework v.{VERSION.framework})
            </div>
        </footer>
    </main>
</div>
