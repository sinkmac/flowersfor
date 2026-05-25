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
</script>

<SeoHead
	title="Wedding flower advice — find the right flowers for your day | FlowersFor"
	description="From bouquets to buttonholes, table arrangements to ceremony flowers — tell us about your wedding and we'll help you find the right direction. Season, setting, style and budget all matter."
	canonical="https://flowersfor.co.uk/wedding"
/>

<SchemaJson schema={advisorSchema} />

<main class="advisor-shell">
	<section class="page-intro">
		<h1>Wedding flower advice — find the right flowers for your day</h1>
		<p>From bouquets to buttonholes, table arrangements to ceremony flowers — tell us about your wedding and we'll help you find the right direction. Season, setting, style and budget all matter.</p>
	</section>

	{#if browser}
		<Advisor mode="wedding" />
	{/if}
</main>
