<script lang="ts">
	import { affiliateDisclosure } from '$lib/affiliateLinks';
	import HeroAdvisor from '$lib/HeroAdvisor.svelte';
	import SeoHead from '$lib/SeoHead.svelte';
</script>

<SeoHead
	title="FlowersFor &mdash; Finish the sentence, we&rsquo;ll finish the bouquet"
	description="Tell us what&rsquo;s happened and we&rsquo;ll recommend exactly what to get. Flowers for any moment &mdash; occasions, weddings, sympathy, and the things we struggle to put into words."
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
	<HeroAdvisor />

	<section class="trust-note">
		<h2>Advice first. Buying second.</h2>
		<p>{affiliateDisclosure}</p>
		<p>Our advice doesn&rsquo;t depend on what we can sell you. If we can&rsquo;t link a recommendation, you still get the recommendation.</p>
	</section>

	<section class="guides-link">
		<p><a href="/guides">Not ready to ask? Read the guides. &rarr;</a></p>
	</section>
</main>