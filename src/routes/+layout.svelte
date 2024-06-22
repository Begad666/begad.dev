<script lang="ts">
	import "@fontsource/exo/latin-400.css";
	import "@fontsource/exo/latin-400-italic.css";
	import "@fontsource/exo/latin-600.css";
	import "@fontsource/raleway/latin-600.css";
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { beforeNavigate } from "$app/navigation";
	import { updated } from "$app/stores";

	beforeNavigate(({ willUnload, to }) => {
		if ($updated && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
</script>

<div class="relative flex flex-col items-center h-full">
	<Header />
	<main class="w-full flex-grow"><slot /></main>
	<Footer />
</div>
