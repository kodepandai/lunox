<script lang="ts">
    export let index = 0,
        url = "",
        title = "",
        description = "",
        icon = "";
</script>

<div
    class="w-full lg:w-1/2 flex flex-col w-full p-5 border-b border-gray-300 {index %
        2 ==
    0
        ? 'lg:border-r border-r-none'
        : ''}"
>
    <div class="items-center flex-row flex">
        <div class="{icon} text-gray-500 text-3xl mr-4" />
        <div>
            <a target="__blank" href={url} class="text-gray-700 text-lg"
                >{title}</a
            >
        </div>
    </div>
    <p class="pl-12 text-gray-500 text-sm">
        {@html description.replace("\n", "<br>")}
    </p>
</div>
