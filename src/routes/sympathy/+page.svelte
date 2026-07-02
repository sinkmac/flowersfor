<script lang="ts">
	import { browser } from '$app/environment';
	import Advisor from '$lib/Advisor.svelte';
	import SeoHead from '$lib/SeoHead.svelte';
	import SchemaJson from '$lib/SchemaJson.svelte';
	import { affiliateLinks } from '$lib/affiliateLinks';

const advisorSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebApplication',
	name: 'FlowersFor sympathy advisor',
	url: 'https://flowersfor.co.uk/sympathy',
	description: 'A free sympathy flower recommendation tool for choosing appropriate, honest and kind condolence flowers without guesswork.',
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
			name: "What flowers do you send when someone's parent dies?",
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Send white and green flowers such as lisianthus, white roses, or chrysanthemums with soft foliage. Send them to the home rather than the funeral unless invited to contribute there, and keep the card short and plain.'
			}
		},
		{
			'@type': 'Question',
			name: 'What do you send if the family asked for family flowers only?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Respect the request and do not send flowers to the funeral. Send a small arrangement to the family home a week or two later, or make the suggested charity donation and send a card.'
			}
		},
		{
			'@type': 'Question',
			name: 'Should you send flowers when a pet dies?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Yes, it is worth doing. Send a small, gentle posy such as freesias or spray roses, name the animal in the card, and avoid anything too grand.'
			}
		}
	]
};
</script>

<SeoHead
	title="Sympathy and condolence flowers — what to send and what to avoid | FlowersFor"
	description="Buying sympathy flowers is one of the most anxiety-inducing purchases there is. We'll help you find something appropriate, honest and kind — without the guesswork."
	canonical="https://flowersfor.co.uk/sympathy"
/>

<SchemaJson schema={[advisorSchema, faqSchema]} />

<main class="advisor-shell">
	<section class="page-intro">
		<h1>Sympathy and condolence flowers — what to send and what to avoid</h1>
		<p>The right sympathy flowers depend on three things: who has died, where the flowers are going, and how close you are to the family. Tell us those and we'll give you a specific answer — flower, colour, timing, and the caveat the florist forgets to mention.</p>
	</section>

	{#if browser}
		<Advisor mode="sympathy" />
	{/if}

	<section class="example-section" aria-labelledby="sympathy-examples">
		<h2 id="sympathy-examples">Examples of what we'd tell you</h2>
		<div class="example-list">
			<p><strong>Flowers for a colleague who's lost a parent</strong> White and green — lisianthus, white roses, or chrysanthemums with soft foliage. Nothing red, nothing bright. Send to their home rather than the funeral unless you've been specifically invited to contribute there. Keep the card line short and plain: "Thinking of you" carries more than anything poetic. They will not remember elaborate words. They will remember that you sent something.</p>
			<a href={affiliateLinks.floetica.url} rel="sponsored nofollow noopener" target="_blank" class="example-cta">Order something like this from Floetica →</a>
			<p><strong>Funeral flowers when the family has asked for "family flowers only"</strong> Respect it — don't send to the funeral. Instead, send a small arrangement to the family home a week or two later, when the cards have stopped and the house has gone quiet. That is when flowers actually help. If the notice suggested a charity donation instead, do that, and send a card.</p>
			<a href={affiliateLinks.floetica.url} rel="sponsored nofollow noopener" target="_blank" class="example-cta">Order something like this from Floetica →</a>
			<p><strong>Flowers for someone whose pet has died</strong> Yes, it's worth doing, and no, it isn't silly. A small posy — something gentle like freesias or spray roses — with a card that names the animal. "So sorry about Bramble" means more than any general sentiment. Avoid anything grand; the scale should match a quiet sadness, not a state occasion.</p>
			<a href={affiliateLinks.floetica.url} rel="sponsored nofollow noopener" target="_blank" class="example-cta">Order something like this from Floetica →</a>
		</div>
	</section>
</main>
