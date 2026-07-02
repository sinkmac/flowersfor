<script lang="ts">
	import { browser } from '$app/environment';
	import Advisor from '$lib/Advisor.svelte';
	import SeoHead from '$lib/SeoHead.svelte';
	import SchemaJson from '$lib/SchemaJson.svelte';
	import { affiliateLinks } from '$lib/affiliateLinks';

const advisorSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebApplication',
	name: 'FlowersFor occasion advisor',
	url: 'https://flowersfor.co.uk/occasion',
	description: 'A free flower recommendation tool for choosing flowers by occasion, recipient relationship, tone and budget.',
	applicationCategory: 'LifestyleApplication',
	operatingSystem: 'Web',
	offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' }
};

const faqSchema = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: [
		{
			'@type': 'Question',
			name: 'What flowers do you send when someone has a baby?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Send freesias or ranunculus in soft pinks, creams, or whites, ideally under £40. Skip lilies because the scent is overwhelming in a newborn household and the pollen stains; choose a jar or box arrangement so nobody has to find a vase.'
			}
		},
		{
			'@type': 'Question',
			name: 'What flowers say sorry?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Avoid red roses because they read as romance, not remorse. Choose a generous hand-tied bunch of seasonal warm-toned stems such as dahlias, stocks, or sunflowers, and let the card do the actual apologising.'
			}
		},
		{
			'@type': 'Question',
			name: 'What flowers do you send as a thank you?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Send a medium bunch of tulips, stocks, or sweet peas in season, around £25–£35. Have them arrive a day or two later so they feel like an afterglow rather than repayment at the door.'
			}
		}
	]
};
</script>

<SeoHead
	title="Flowers for any occasion — get the right recommendation | FlowersFor"
	description="Not sure what flowers to send? Tell us who they're for, what's happening, and your budget — and we'll suggest exactly what to get and why it works. No generic bunches. No guessing."
	canonical="https://flowersfor.co.uk/occasion"
/>

<SchemaJson schema={[advisorSchema, faqSchema]} />

<main class="advisor-shell">
	<section class="page-intro">
		<h1>Flowers for any occasion — get the right recommendation</h1>
		<p>The right flowers depend on three things: who they're for, what's happened, and your budget. Tell us those and we'll give you a specific answer — flower, colour, price, and the caveat the florist forgets to mention.</p>
	</section>

	{#if browser}
		<Advisor mode="occasion" />
	{/if}

	<section class="example-section" aria-labelledby="occasion-examples">
		<h2 id="occasion-examples">Examples of what we'd tell you</h2>
		<div class="example-list">
			<p><strong>Flowers for a friend who's just had a baby, under £40</strong> Freesias or ranunculus in soft pinks, creams, or whites. Skip lilies entirely — the scent is overwhelming in a newborn household and the pollen stains everything it touches. Order them arranged in a jar or box, not as a wrap, because nobody in that house has the energy to find a vase.</p>
			<a href={affiliateLinks.myflowers.url} rel="sponsored nofollow noopener" target="_blank" class="example-cta">Order something like this from MyFlowers →</a>
			<p><strong>Apology flowers when you've genuinely messed up</strong> Not red roses — they read as romance, not remorse. Go for a generous hand-tied bunch of seasonal stems in warm tones: dahlias, stocks, or sunflowers depending on the time of year. Spend slightly more than feels comfortable. The flowers say you mean it; the card does the actual apologising, so keep the message short and don't explain yourself in it.</p>
			<a href={affiliateLinks.floetica.url} rel="sponsored nofollow noopener" target="_blank" class="example-cta">Order something like this from Floetica →</a>
			<p><strong>Thank-you flowers for someone who put you up for the weekend</strong> A medium bunch of tulips, stocks, or sweet peas in season — cheerful, unfussy, nothing that demands arranging skill. Around £25–£35 is right; bigger starts to feel like repayment rather than thanks. Send to arrive a day or two after you leave, not the day of departure, so it lands as an afterglow rather than an obligation discharged at the door.</p>
			<a href={affiliateLinks.myflowers.url} rel="sponsored nofollow noopener" target="_blank" class="example-cta">Order something like this from MyFlowers →</a>
		</div>
	</section>
</main>
