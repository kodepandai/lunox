<script lang="ts">
    export let version: Record<string, string> = {
      app: "",
      framework: "",
    };
</script>

<div class="bg-gray-100 min-h-screen relative">
    <main
        class="mx-auto container py-10 xl:px-30 lg:px-10 px-4 font-sans pb-15 justify-center flex flex-col min-h-screen"
    >
        <slot />
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
                Lunox v.{version.app}(framework v.{version.framework})
            </div>
        </footer>
    </main>
</div>
