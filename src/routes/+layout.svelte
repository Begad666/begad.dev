<script lang="ts">
	import "@fontsource/exo/latin-400.css";
	import "@fontsource/exo/latin-400-italic.css";
	import "@fontsource/exo/latin-600.css";
	import "@fontsource/raleway/latin-600.css";
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<div class="relative flex flex-col items-center h-full">
	<Header />
	<main class="w-full flex-grow"><slot /></main>
	<Footer />
</div>
