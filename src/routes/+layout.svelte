<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>FlowersFor | Conversational flower advisor</title>
	<meta
		name="description"
		content="Ask FlowersFor what flowers to send for an occasion, wedding, or sympathy moment. Warm, specific flower advice with no quiz."
	/>
</svelte:head>

<header class="site-header">
	<a class="brand" href="/" aria-label="FlowersFor home">
		<span>FlowersFor</span>
	</a>
	<nav aria-label="Primary navigation">
		<a href="/occasion">Occasion</a>
		<a href="/wedding">Wedding</a>
		<a href="/sympathy">Sympathy</a>
		<a href="/affiliate-disclosure">Disclosure</a>
		<a href="/privacy">Privacy</a>
	</nav>
</header>

{@render children()}

<footer class="site-footer">
	<p>
		FlowersFor is an independent advice tool. We're not florists — we're a tool that helps you find the right flowers. Always check delivery availability and allergy information directly with your chosen supplier.
	</p>
	<nav aria-label="Footer navigation">
		<a href="/affiliate-disclosure">Affiliate disclosure</a>
		<a href="/privacy">Privacy</a>
	</nav>
</footer>
