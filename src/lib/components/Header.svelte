<script lang="ts">
	import HeaderLink from "./HeaderLink.svelte";
</script>

<header
	class="border-b w-full p-2 sm:py-3 border-zinc-500 sticky top-0 flex justify-between items-center"
>
	<div>
		<a
			href="/"
			class="text-lg font-semibold hover:bg-zinc-800 w-12 h-12 p-2 rounded-lg transition-colors active:bg-zinc-700 focus:bg-zinc-800 outline-none"
			>begad</a
		>
	</div>
	<nav class="flex gap-3 sm:gap-4">
		<HeaderLink href="/" exact>home</HeaderLink>
		<HeaderLink href="/projects" exact>projects</HeaderLink>
		<HeaderLink href="/contact" exact>contact</HeaderLink>
	</nav>
</header>
