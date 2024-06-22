import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			routes: {
				include: ["/*"],
				// TODO: make issue for the configuration option for "_app/env.js" file in sveltekit
				// exclude: ["<all>"]
				exclude: ["/_app/immutable/*", "/_app/version.json", "<files>", "<prerendered>"]
			},
			platformProxy: {
				configPath: "wrangler.toml",
				environment: undefined,
				experimentalJsonConfig: false,
				persist: true
			}
		})
	}
};

export default config;
