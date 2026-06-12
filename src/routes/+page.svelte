<script lang="ts">
	import { affiliateDisclosure } from '$lib/affiliateLinks';
	import SeoHead from '$lib/SeoHead.svelte';
	import { entryPoints } from '$lib/prompts';

	const entries = [entryPoints.occasion, entryPoints.wedding, entryPoints.sympathy];
</script>

<SeoHead
	title="FlowersFor — Find the right flowers for any occasion"
	description="Tell us who the flowers are for and we'll recommend exactly what to get — for occasions, weddings and sympathy."
	canonical="https://flowersfor.co.uk/"
/>

<svelte:head>
	<meta name="google-site-verification" content="dylZKayys6-4uyFR07A3F17o_WgIMwLHfLW47K1Nlg4" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "WebSite",
					"name": "FlowersFor",
					"url": "https://flowersfor.co.uk",
					"description": "A flower advisor for awkward, emotional, urgent and relationship-specific gifting."
				},
				{
					"@type": "Organization",
					"name": "AI Scotland Productions",
					"url": "https://aiscotlandproductions.com"
				},
				{
					"@type": "WebApplication",
					"name": "FlowersFor occasion advisor",
					"url": "https://flowersfor.co.uk/occasion",
					"description": "A free flower recommendation tool for choosing flowers by occasion, recipient relationship, tone and budget.",
					"applicationCategory": "LifestyleApplication",
					"operatingSystem": "Web",
					"offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" }
				},
				{
					"@type": "WebApplication",
					"name": "FlowersFor wedding advisor",
					"url": "https://flowersfor.co.uk/wedding",
					"description": "A free wedding flower direction tool for choosing bouquets, arrangements and florist conversations by season, setting, style and budget.",
					"applicationCategory": "LifestyleApplication",
					"operatingSystem": "Web",
					"offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" }
				},
				{
					"@type": "WebApplication",
					"name": "FlowersFor sympathy advisor",
					"url": "https://flowersfor.co.uk/sympathy",
					"description": "A free sympathy flower recommendation tool for choosing appropriate, honest and kind condolence flowers without guesswork.",
					"applicationCategory": "LifestyleApplication",
					"operatingSystem": "Web",
					"offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" }
				}
			]
		}
	</script>
</svelte:head>


<main class="home-shell">
	<section class="hero">
		<div class="hero__copy">
			<p class="kicker">Conversational flower advisor</p>
			<h1>Tell us the moment. We’ll tell you the flowers.</h1>
			<p>
				Buying flowers carries social risk: the wrong colour, the wrong tone, the wrong bouquet for a home with cats. FlowersFor gives you the calm, specific answer you wanted from a good florist.
			</p>
		</div>
		<div class="botanical-mark" aria-hidden="true">
			<svg viewBox="0 0 160 220" role="img">
				<desc>Lisianthus line illustration</desc>
				<path d="M80 204 C74 166 76 128 83 86" />
				<path d="M84 89 C52 79 42 45 65 28 C91 9 124 30 118 58 C114 81 98 90 84 89Z" />
				<path d="M80 92 C64 65 72 36 96 31" />
				<path d="M86 103 C116 96 137 112 133 138 C130 160 103 169 88 151 C78 139 78 117 86 103Z" />
				<path d="M79 137 C55 129 41 144 45 164 C49 184 75 188 84 169" />
				<path d="M79 150 C95 137 108 126 125 120" />
				<path d="M78 157 C64 157 55 163 46 173" />
			</svg>
		</div>
	</section>

	<section class="door-grid" aria-label="Choose an advisor">
		{#each entries as entry}
			<a class="door door--{entry.shortTitle.toLowerCase()}" href={entry.path}>
				<p>{entry.register}</p>
				<h2>{entry.title}</h2>
				<span>{entry.description}</span>
			</a>
		{/each}
	</section>

	<section class="trust-note">
		<h2>Advice first. Buying second.</h2>
		<p>{affiliateDisclosure}</p>
		<p>Our advice doesn't depend on what we can sell you. If we can't link a recommendation, you still get the recommendation.</p>
	</section>
</main>
