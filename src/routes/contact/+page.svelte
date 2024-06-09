<script lang="ts">
	import { Turnstile } from "svelte-turnstile";
	import { env } from "$env/dynamic/public";
	import type { ActionData, Snapshot } from "./$types";

	let allowSubmit = false;

	function onTurnstileCallback() {
		allowSubmit = true;
	}

	function onTurnstileError() {
		allowSubmit = false;
	}

	export let form: ActionData;

	let email = form?.email ?? "";

	let message = form?.message ? `${form?.message}` : "";

	export const snapshot: Snapshot<{ email: string; message: string }> = {
		capture: () => ({ email, message }),
		restore: (value) => ({ email, message } = value)
	};
</script>

<svelte:head>
	<title>contact begad</title>
</svelte:head>

<div class="p-6 flex flex-col">
	<h1 class="text-2xl font-bold font-heading">contact me</h1>
	<p class:hidden={form?.success}>
		if you want to send me a message quickly, then you can use the form below
	</p>
	<p class:hidden={form?.success}>you can also contact me using the links down in the footer</p>
	<form
		class="mx-auto border rounded-xl border-zinc-500 w-full max-w-[600px] p-3 mt-2 flex flex-col"
		class:hidden={form?.success}
		method="POST"
	>
		<div class="relative flex flex-col">
			<label for="email" class="text-sm text-zinc-400 font-semibold">email</label>
			<input
				required
				name="email"
				id="email"
				type="email"
				class="bg-transparent mt-1 outline-none border-b rounded-t-lg border-zinc-600 active:border-zinc-500 focus:border-zinc-500 bg-zinc-800 active:bg-zinc-700 focus:bg-zinc-700 transition-colors text-zinc-300 p-1"
				bind:value={email}
			/>
		</div>
		<div class="relative flex flex-col mt-2">
			<label for="message" class="text-sm text-zinc-400 font-semibold">message</label>
			<textarea
				required
				name="message"
				id="message"
				class="bg-transparent mt-1 outline-none border-b rounded-t-lg border-zinc-600 active:border-zinc-500 focus:border-zinc-500 bg-zinc-800 active:bg-zinc-700 focus:bg-zinc-700 transition-colors text-zinc-300 p-1"
				bind:value={message}
			/>
			<span class="text-xs text-zinc-500 font-semibold">max. 500 characters</span>
		</div>
		<div class="relative flex flex-col items-center mt-2">
			<Turnstile
				siteKey={env.PUBLIC_TURNSTILE_SITEKEY}
				action="contact-submit"
				on:turnstile-callback={onTurnstileCallback}
				on:turnstile-error={onTurnstileError}
				on:turnstile-timeout={onTurnstileError}
				on:turnstile-expired={onTurnstileError}
			/>
		</div>
		<button
			disabled={!allowSubmit}
			class="mt-2 font-semibold bg-zinc-800 hover:bg-zinc-700 p-2 rounded-lg transition-colors active:bg-zinc-600 focus:bg-zinc-700 outline-none disabled:text-zinc-600 disabled:bg-zinc-900 disabled:cursor-not-allowed"
			>submit</button
		>
	</form>
	<p class="mx-auto text-emerald-500" class:hidden={!form?.success}>
		your message has been sent successfully!
	</p>
	<p class="mx-auto text-red-500" class:hidden={!form?.error}>
		{form?.error}
	</p>
</div>
