<script lang="ts">
	import { browser } from '$app/environment';
	import Advisor from '$lib/Advisor.svelte';
	import SeoHead from '$lib/SeoHead.svelte';
</script>

<SeoHead
	title="Wedding flower advice — find the right flowers for your day | FlowersFor"
	description="From bouquets to buttonholes, table arrangements to ceremony flowers — tell us about your wedding and we'll help you find the right direction. Season, setting, style and budget all matter."
	canonical="https://flowersfor.co.uk/wedding"
/>

<main class="advisor-shell">
	<section class="page-intro">
		<h1>Wedding flower advice — find the right flowers for your day</h1>
		<p>From bouquets to buttonholes, table arrangements to ceremony flowers — tell us about your wedding and we'll help you find the right direction. Season, setting, style and budget all matter.</p>
	</section>

	{#if browser}
		<Advisor mode="wedding" />
	{/if}
</main>
