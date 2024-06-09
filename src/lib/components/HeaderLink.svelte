<script lang="ts">
	import { page } from "$app/stores";

	export let href = "/";
	export let exact = false;

	$: active = exact ? $page.url.pathname === href : $page.url.pathname.startsWith(href);
</script>

<a
	{href}
	class="font-semibold border-b-2 border-b-zinc-800 hover:border-b-zinc-500 py-1 px-2 transition-colors active:border-b-zinc-300 [&.current]:border-b-zinc-300 focus:border-b-zinc-500 outline-none"
	aria-current={active ? "page" : null}
	class:current={active}><slot /></a
>
