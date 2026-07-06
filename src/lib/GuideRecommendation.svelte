<script lang="ts">
	import { affiliateLinks } from '$lib/affiliateLinks';

	type Props = {
		merchant: 'floetica' | 'myflowers';
		framing: string;
	};

	let { merchant, framing }: Props = $props();

	const link = affiliateLinks[merchant as keyof typeof affiliateLinks];
</script>

{#if link?.url}
	<div class="guide-rec">
		<p class="guide-rec__framing">{framing}</p>
		<a
			class="guide-rec__link"
			href={link.url}
			rel="sponsored nofollow noopener"
			target="_blank"
		>
			<strong>{link.label}</strong>
			<span>{link.sublabel}</span>
		</a>
	</div>
{/if}

<style>
	.guide-rec {
		margin-top: 2rem;
		padding: 1.25rem 1.5rem;
		background: var(--paper);
		border: 1px solid rgba(49, 79, 66, .14);
		border-radius: 1.25rem;
		box-shadow: var(--shadow);
	}
	.guide-rec__framing {
		font-size: 1.05rem;
		line-height: 1.5;
		margin: 0 0 .75rem;
		color: var(--charcoal);
	}
	.guide-rec__link {
		display: inline-flex;
		flex-direction: column;
		padding: .7rem 1.1rem;
		background: var(--sage-deep);
		color: var(--cream);
		text-decoration: none;
		border-radius: .6rem;
		font-size: .95rem;
		gap: .15rem;
	}
	.guide-rec__link:hover {
		opacity: .9;
	}
	.guide-rec__link span {
		font-size: .82rem;
		opacity: .8;
	}
</style>