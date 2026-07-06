<script lang="ts">
	import SeoHead from '$lib/SeoHead.svelte';
</script>

<SeoHead
	title="The Guides — straight answers, no browsing required | FlowersFor"
	description="Six straight-ahead guides for the moments most people don't plan for: apology flowers, card messages, sympathy etiquette, anniversary recovery, flower meanings, and the groom's side."
	canonical="https://flowersfor.co.uk/guides"
/>

<main class="text-page">
	<article>
		<h1>Guides</h1>
		<p class="lede">Straight answers, no browsing required. Pick the one that matches your situation.</p>

		<div class="guides-list">
			<a href="/guides/apology-flowers" class="guide-card">
				<h2>Apology Flowers</h2>
				<p>What to send and what never to send. One straight answer, no guesswork.</p>
			</a>
			<a href="/guides/what-to-write-on-the-card" class="guide-card">
				<h2>What to Write on the Card</h2>
				<p>Ready-to-use messages for apologies, anniversaries, sympathy and more.</p>
			</a>
			<a href="/guides/sympathy-flowers-etiquette" class="guide-card">
				<h2>Sympathy Flowers</h2>
				<p>A plain guide for people who have never had to do this.</p>
			</a>
			<a href="/guides/forgot-the-anniversary" class="guide-card">
				<h2>Forgot the Anniversary</h2>
				<p>What to order in the next ten minutes and what to say when they arrive.</p>
			</a>
			<a href="/guides/what-flowers-mean" class="guide-card">
				<h2>What Flowers Mean</h2>
				<p>What your choice says before the card is opened.</p>
			</a>
			<a href="/guides/flowers-for-the-groom-party" class="guide-card">
				<h2>The Groom's Side</h2>
				<p>Buttonholes, thank-you bouquets, the mums — what you actually need to sort.</p>
			</a>
		</div>
	</article>
</main>

<style>
	.guides-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
		margin-top: 1.5rem;
	}
	.guide-card {
		padding: 1.25rem;
		border-radius: 1.25rem;
		text-decoration: none;
		color: var(--charcoal);
		background: var(--paper);
		border: 1px solid rgba(49, 79, 66, .14);
		box-shadow: var(--shadow);
		transition: transform .2s ease, box-shadow .2s ease;
	}
	.guide-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 20px 60px rgba(38, 48, 37, .18);
	}
	.guide-card h2 {
		font-size: 1.35rem;
		margin: 0 0 .5rem;
	}
	.guide-card p {
		margin: 0;
		font-size: .95rem;
		color: rgba(43, 41, 36, .72);
		line-height: 1.5;
	}
</style>
