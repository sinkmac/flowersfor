<script lang="ts">
	import { affiliateDisclosure, affiliateLinks } from '$lib/affiliateLinks';
</script>

<svelte:head>
	<title>Affiliate disclosure | FlowersFor</title>
</svelte:head>

<main class="text-page">
	<p class="kicker">Affiliate disclosure</p>
	<h1>How FlowersFor makes money</h1>
	<p>{affiliateDisclosure}</p>
	<p>Our flower advice is written to be useful first. A supplier link only appears after a recommendation, and only when a real tracked URL is configured.</p>
	<h2>Current affiliate configuration</h2>
	<ul>
		{#each Object.entries(affiliateLinks) as [key, link]}
			<li><strong>{key}</strong>: {link.network}, status {link.status}, {link.geo}</li>
		{/each}
	</ul>
</main>
