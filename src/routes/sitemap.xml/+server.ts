import { env } from "$env/dynamic/public";

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

function createElement(
	path: string,
	lastModification?: Date,
	changeFrequency?: ChangeFrequency,
	priority?: number
): string {
	return `
		<url>
			<loc>${new URL(path, env.PUBLIC_CANONICAL_ORIGIN).href}</loc>
			${lastModification ? `<lastmod>${lastModification.getFullYear()}-${lastModification.getMonth().toString().padStart(2, "0")}-${lastModification.getDate().toString().padStart(2, "0")}</lastmod>` : ""}
			${changeFrequency ? `<changefreq>${changeFrequency}</changefreq>` : ""}
			${priority ? `<priority>${priority}</priority>` : ""}
		</url>
	`.trim();
}
export async function GET() {
	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			${createElement("/", new Date(2023, 5, 22))}
			${createElement("/contact", new Date(2023, 5, 22))}
			${createElement("/projects", new Date(2023, 5, 22))}
		</urlset>`.trim(),
		{
			headers: {
				"Content-Type": "application/xml"
			}
		}
	);
}
