<script lang="ts">
	import SeoHead from '$lib/SeoHead.svelte';
	import { affiliateDisclosure } from '$lib/affiliateLinks';
</script>

<SeoHead
	title="Affiliate disclosure | FlowersFor"
	description="How FlowersFor may earn commission from relevant flower supplier links without changing the advice shown."
	canonical="https://flowersfor.co.uk/affiliate-disclosure"
/>


<main class="text-page">
	<p class="kicker">Affiliate disclosure</p>
	<h1>How FlowersFor makes money</h1>
	<p>{affiliateDisclosure}</p>
	<p>Our flower advice is written to be useful first. A supplier link only appears after a recommendation, and only when we can confidently recommend a specific merchant for that situation.</p>
	<p>FlowersFor participates in the Awin Affiliate Network. If you click a tracked link and make a purchase, we may earn a small commission at no extra cost to you. The merchants we work with include Floetica and MyFlowers. We do not accept payment for advice or placement, and our recommendations never depend on commission.</p>
	<p>If you have questions about our affiliate relationships, <a href="/contact">contact us</a>.</p>
</main>
