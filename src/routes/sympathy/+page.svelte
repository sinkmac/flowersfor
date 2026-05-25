<script lang="ts">
	import { browser } from '$app/environment';
	import Advisor from '$lib/Advisor.svelte';
	import SeoHead from '$lib/SeoHead.svelte';
	import SchemaJson from '$lib/SchemaJson.svelte';


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
</script>

<SeoHead
	title="Sympathy and condolence flowers — what to send and what to avoid | FlowersFor"
	description="Buying sympathy flowers is one of the most anxiety-inducing purchases there is. We'll help you find something appropriate, honest and kind — without the guesswork."
	canonical="https://flowersfor.co.uk/sympathy"
/>

<SchemaJson schema={advisorSchema} />

<main class="advisor-shell">
	<section class="page-intro">
		<h1>Sympathy and condolence flowers — what to send and what to avoid</h1>
		<p>Buying sympathy flowers is one of the most anxiety-inducing purchases there is. We'll help you find something appropriate, honest and kind — without the guesswork.</p>
	</section>

	{#if browser}
		<Advisor mode="sympathy" />
	{/if}
</main>
