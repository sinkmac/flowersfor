const routes = ['/', '/occasion', '/wedding', '/sympathy', '/privacy', '/affiliate-disclosure', '/contact'];

export function GET() {
	const urls = routes.map((route) => `  <url><loc>https://flowersfor.co.uk${route}</loc></url>`).join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8'
		}
	});
}
