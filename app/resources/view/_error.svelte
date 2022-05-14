<script lang="ts">
    export let message: string, code: number, stack: string;
</script>

<div />
<div class="bg-gray-100 min-h-screen relative items-center flex">
    <main
        class="mx-auto container py-10 xl:px-30 lg:px-10 px-4 font-sans pb-15"
    >
        <div class="flex flex-col text-gray-600 items-center">
            <div class="flex flex-row items-center">
                <h1 class="text-5xl font-bold border-r pr-4">{code}</h1>
                <h3 class="italic pl-4">{message}</h3>
            </div>
            {#if stack}
                <pre
                    class="text-red-800 bg-orange-100 rounded-lg mt-10 p-5 whitespace-pre-line">
                 {stack}
                </pre>
            {/if}
        </div>
    </main>
</div>
