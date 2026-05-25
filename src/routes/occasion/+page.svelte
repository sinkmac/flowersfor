<script lang="ts">
	import { browser } from '$app/environment';
	import Advisor from '$lib/Advisor.svelte';
	import SeoHead from '$lib/SeoHead.svelte';
	import SchemaJson from '$lib/SchemaJson.svelte';


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
</script>

<SeoHead
	title="Flowers for any occasion — get the right recommendation | FlowersFor"
	description="Not sure what flowers to send? Tell us who they're for, what's happening, and your budget — and we'll suggest exactly what to get and why it works. No generic bunches. No guessing."
	canonical="https://flowersfor.co.uk/occasion"
/>

<SchemaJson schema={advisorSchema} />

<main class="advisor-shell">
	<section class="page-intro">
		<h1>Flowers for any occasion — get the right recommendation</h1>
		<p>Not sure what flowers to send? Tell us who they're for, what's happening, and your budget — and we'll suggest exactly what to get and why it works. No generic bunches. No guessing.</p>
	</section>

	{#if browser}
		<Advisor mode="occasion" />
	{/if}
</main>
