<script lang="ts" context="module">
    import type User from "app/Model/User";
    export const onServer: OnServer = async (req) => {
        const user = (await req?.auth().user()) as User | undefined;
        return {
            user: user
                ? {
                      ...user,
                      full_name: user?.full_name, // getter need to be called
                  }
                : undefined,
        };
    };
</script>

<script lang="ts">
    import { page, Link } from "@lunoxjs/view-plugin-svelte";
    import { Toaster } from "$lib/components/ui/sonner";
    import { toast } from "svelte-sonner";
    import { ModeWatcher } from "mode-watcher";
    import LightSwitch from "$lib/components/LightSwitch.svelte";
    import type { OnServer } from "@lunoxjs/core/contracts";
    export let version: Record<string, string> = {
        app: "",
        framework: "",
    };
    export let user: User | undefined;

    $: if ($page?.sessions?.message && !import.meta.env.SSR) {
        toast.error($page?.sessions?.message, {
            cancel: {
                label: "close",
            },
        });
    }
</script>

<div class="bg-secondary min-h-screen relative">
    <div
        class="fixed top-0 left-0 right-0 bg-primary-foreground z-10 backdrop-blur"
    >
        <div class="mx-auto container flex items-center h-12 gap-4">
            <Link href="/" class="p-4 flex gap-2 item-center">
                <img src="/images/logo.svg" alt="Lunox" class="h-9" />
                <div class="my-auto">
                    <span>Lu</span><span class="text-yellow-600">nox</span>
                </div>
            </Link>

            <div class="ml-auto text-primary font-bold">
                {#if user}
                    <Link href="/admin">Dashboard</Link>
                {:else}
                    <Link href="/login">Login Now</Link>
                {/if}
            </div>
            <LightSwitch />
        </div>
    </div>
    <main
        class="mx-auto container py-20 xl:px-30 lg:px-10 px-4 font-sans justify-center flex flex-col min-h-screen"
    >
        <slot />
        <footer
            class="absolute bottom-0 mb-5 left-0 right-0 px-10 text-gray-500 flex flex-row justify-between text-sm font-sans"
        >
            <a
                class="flex flex-row items-center text-gray-500"
                href="https://github.com/kodepandai/lunox"
            >
                <div class="icon-[ant-design--github-filled] text-xl mr-1" />
                <span>kodepandai/lunox</span>
            </a>
            <div>
                Lunox v.{version.app}(framework v.{version.framework})
            </div>
        </footer>
    </main>
</div>
<Toaster />
<ModeWatcher />
