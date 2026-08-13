<script lang="ts">
	import { onMount } from 'svelte';
	import { affiliateDisclosure } from '$lib/affiliateLinks';
	import HeroAdvisor from '$lib/HeroAdvisor.svelte';
	import SeoHead from '$lib/SeoHead.svelte';
	import { track } from '$lib/analytics';

	onMount(() => {
		track({ name: 'page_variant', value: 'landing-a' });
	});
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

	<section class="how-it-works">
		<h2>How it works</h2>
		<div class="steps-grid">
			<div class="step">
				<h3>1. Tell us what&rsquo;s happened.</h3>
				<p>In your own words &mdash; &ldquo;my sister&rsquo;s had a baby,&rdquo; &ldquo;my neighbour&rsquo;s husband died,&rdquo; &ldquo;I forgot our anniversary.&rdquo;</p>
			</div>
			<div class="step">
				<h3>2. See what fits.</h3>
				<p>We match flowers to the situation: what they mean, what they cost, what to avoid.</p>
			</div>
			<div class="step">
				<h3>3. Get the words.</h3>
				<p>The card is the hard part. We give you something to write that doesn&rsquo;t sound like a greetings card.</p>
			</div>
			<div class="step">
				<h3>4. Send with confidence.</h3>
				<p>Order from a florist you trust &mdash; we&rsquo;ll point you to good ones.</p>
			</div>
		</div>
	</section>

	<section class="example-cards">
		<h2>See it work</h2>
		<div class="example-grid">
			<article class="example-card">
				<h3>My boss who&rsquo;s retiring</h3>
				<p class="example-card__label"><strong>The flowers:</strong> Something structural and lasting &mdash; an orchid or a planted arrangement rather than a cut bouquet. It says &ldquo;we thought about this&rdquo; and survives the week of leaving drinks.</p>
				<p class="example-card__label"><strong>The card:</strong> &ldquo;Thirty years of showing the rest of us how it&rsquo;s done. The place won&rsquo;t be the same &mdash; enjoy every unscheduled Monday.&rdquo;</p>
				<a class="example-cta" href="/occasion">Try it &rarr;</a>
			</article>
			<article class="example-card">
				<h3>My neighbour whose husband died</h3>
				<p class="example-card__label"><strong>The flowers:</strong> White lilies or white roses &mdash; quiet, traditional, and right. Avoid anything bright or scented-showy; this is not a bouquet that should announce itself.</p>
				<p class="example-card__label"><strong>The card:</strong> &ldquo;I&rsquo;m so sorry about John. No need to reply to this &mdash; just know we&rsquo;re next door, and the offer of anything at all is a standing one.&rdquo;</p>
				<a class="example-cta" href="/occasion">Try it &rarr;</a>
			</article>
			<article class="example-card">
				<h3>I forgot our anniversary</h3>
				<p class="example-card__label"><strong>The flowers:</strong> Not red roses &mdash; that&rsquo;s the panic buy and she&rsquo;ll know it. Her actual favourites if you know them; peonies or ranunculus if you don&rsquo;t. The effort of specificity is the apology.</p>
				<p class="example-card__label"><strong>The card:</strong> &ldquo;I got the date wrong and I know it. This isn&rsquo;t the make-up gift &mdash; dinner on Friday is. This is just because you deserved flowers on the day.&rdquo;</p>
				<a class="example-cta" href="/occasion">Try it &rarr;</a>
			</article>
		</div>
	</section>

	<section class="guides-link">
		<p><a href="/guides">Not ready to ask? Read the guides. &rarr;</a></p>
	</section>
</main>