<script lang="ts">
	import { browser } from '$app/environment';
	import Advisor from '$lib/Advisor.svelte';
	import SeoHead from '$lib/SeoHead.svelte';
	import SchemaJson from '$lib/SchemaJson.svelte';

const advisorSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebApplication',
	name: 'FlowersFor wedding advisor',
	url: 'https://flowersfor.co.uk/wedding',
	description: 'A free wedding flower direction tool for choosing bouquets, arrangements and florist conversations by season, setting, style and budget.',
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
			name: 'What buttonholes work for a groom and groomsmen?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'For a September wedding, use a single spray rose with a sprig of eucalyptus each. Order one spare because one often gets crushed, and ask for pinned fixings if anyone is wearing tweed or heavier wool.'
			}
		},
		{
			'@type': 'Question',
			name: 'How do you do wedding flowers on a budget?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Put the money where the photos happen: two larger arrangements at the front and nothing on the aisle. Choose seasonal flowers and move the ceremony arrangements to the reception afterwards so they work twice.'
			}
		},
		{
			'@type': 'Question',
			name: 'How big should a bridal bouquet be?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'If the dress has lace, beading, or embroidery, keep the bouquet simple. If the dress is plain, the bouquet can carry more texture, but ask for it slightly smaller than the florist first suggests because bouquets photograph larger than they feel.'
			}
		}
	]
};
</script>

<SeoHead
	title="Wedding flower advice — find the right flowers for your day | FlowersFor"
	description="From bouquets to buttonholes, table arrangements to ceremony flowers — tell us about your wedding and we'll help you find the right direction. Season, setting, style and budget all matter."
	canonical="https://flowersfor.co.uk/wedding"
/>

<SchemaJson schema={[advisorSchema, faqSchema]} />

<main class="advisor-shell">
	<section class="page-intro">
		<h1>Wedding flower advice — find the right flowers for your day</h1>
		<p>The right wedding flowers depend on three things: where they'll be seen, what the season gives you, and what the photographs need to carry. Tell us those and we'll give you a specific answer — flower, colour, price, and the caveat the florist forgets to mention.</p>
	</section>

	{#if browser}
		<Advisor mode="wedding" />
	{/if}

	<section class="example-section" aria-labelledby="wedding-examples">
		<h2 id="wedding-examples">Examples of what we'd tell you</h2>
		<div class="example-list">
			<p><strong>Buttonholes for a September wedding, groom plus four</strong> A single spray rose with a sprig of eucalyptus each — clean, photographs well, and won't wilt by the speeches. Order six, not five: one always gets crushed in a hug before the ceremony. Ask the florist for pinned, not magnetic, fixings if anyone is wearing tweed or heavier wool.</p>
			<p><strong>Ceremony flowers on a tight budget</strong> Put the money where the photos happen: two larger arrangements at the front, nothing on the aisle. Choose what's in season that month — September means dahlias, May means peonies if you're lucky and stocks if you're not — because seasonal stems cost half what imported ones do. Move the two arrangements to the reception afterwards and they work twice.</p>
			<p><strong>A bridal bouquet that won't fight the dress</strong> If the dress has detail — lace, beading, embroidery — keep the bouquet simple: one flower type, one accent green, loosely tied. If the dress is plain, the bouquet can carry texture and trailing stems. Either way, ask for it slightly smaller than the florist's first suggestion; bouquets photograph a size larger than they feel in the hand.</p>
		</div>
	</section>
</main>
