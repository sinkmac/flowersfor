<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>


<header class="site-header">
	<a class="brand" href="/" aria-label="FlowersFor home">
		<span>FlowersFor</span>
	</a>
	<nav aria-label="Primary navigation">
		<a href="/about">About</a>
		<a href="/affiliate-disclosure">Disclosure</a>
		<a href="/privacy">Privacy</a>
		<a href="/contact">Contact</a>
	</nav>
</header>

{@render children()}

<footer class="site-footer">
	<p>
		FlowersFor is an independent advice tool. We\u2019re not florists \u2014 we\u2019re a tool that helps you find the right flowers. Always check delivery availability and allergy information directly with your chosen supplier.
	</p>
	<p class="footer-affiliate">Some links earn us a commission. It never changes our recommendation.</p>
	<nav aria-label="Footer navigation">
		<a href="/about">About</a>
		<a href="/guides">Guides</a>
		<a href="/affiliate-disclosure">Affiliate disclosure</a>
		<a href="/privacy">Privacy</a>
	</nav>
</footer>