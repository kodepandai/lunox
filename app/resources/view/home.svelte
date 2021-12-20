<script lang="ts">
    export let message: string;
    export let data: any;
    export let session: Session;
    export let old: Old;

    let showData = false;
    let username = "";
    let input = {
        username: old("username"),
    };

    const error = (key: string) => session(`errors.${key}.message`);

    if (session("message")) {
        message = session("message");
    }
    username = old("username");
    const auth = session("auth");

    const doLogout = () => {
        window.location.replace("/logout");
    };
</script>

<h1>{auth ? `Hello ${auth.username}` : message}</h1>

<svelte:head>
    <title>Home</title>
</svelte:head>

<button on:click={() => (showData = !showData)}
    >{showData ? "HIDE DATA" : "SHOW DATA"}</button
>
<p>data from request:</p>
{#if showData}
    <pre>
    {JSON.stringify({ ...data, username }, null, 2)}
</pre>
{/if}

{#if data.isLogin}
    <button on:click={doLogout}>LOGOUT</button>
{:else}
    <form action="/login" method="post">
        <input type="text" name="username" bind:value={input.username} />
        <button type="submit">LOGIN</button>
    </form>
    {#if error("username")}
        <div>
            <small style="color:red">
                {error("username")}
            </small>
        </div>
    {/if}
{/if}
