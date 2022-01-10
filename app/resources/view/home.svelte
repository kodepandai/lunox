<script context="module" lang="ts">
    export async function loaxd(x: any) {
        console.log("load", x);
    }
</script>

<script lang="ts">
    export let message: string;
    export let data: any;
    export let session: Session;
    export let old: Old;

    let showData = false;
    let input = {
        email: old("email"),
        password: "",
    };

    const error = (key: string) => session(`errors.${key}.message`);

    if (session("message")) {
        message = session("message");
    }

    const doLogout = () => {
        window.location.replace("/logout");
    };
</script>

<h1>{data.auth ? `Hello ${data.auth.username.toUpperCase()}` : message}</h1>

<svelte:head>
    <title>Home</title>
</svelte:head>

<button on:click={() => (showData = !showData)}
    >{showData ? "HIDE DATA" : "SHOW DATA"}</button
>
<p>data from request:</p>
{#if showData}
    <pre>
    {JSON.stringify({ ...data }, null, 2)}
</pre>
{/if}

{#if data.auth}
    <button on:click={doLogout}>LOGOUT</button>
{:else}
    <form action="/login" method="post">
        <input type="text" name="email" bind:value={input.email} required />
        <input
            type="password"
            name="password"
            bind:value={input.password}
            required
        />
        <button type="submit">LOGIN</button>
    </form>
    {#if error("email")}
        <div>
            <small style="color:red">
                {error("email")}
            </small>
        </div>
    {/if}
{/if}

<pre>
email: "user@example.mail"
password: "password"
</pre>
