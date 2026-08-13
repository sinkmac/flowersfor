<script lang="ts">
	import { onMount } from 'svelte';
	import { affiliateDisclosure, getLiveAffiliateLinksForMode } from '$lib/affiliateLinks';
	import { type AdvisorMode } from '$lib/prompts';
	import { track } from '$lib/analytics';
	import SeoHead from '$lib/SeoHead.svelte';

	type ChatMessage = {
		role: 'user' | 'assistant';
		content: string;
	};

	let draft = $state('');
	let messages = $state<ChatMessage[]>([]);
	let loading = $state(false);
	let error = $state('');
	let mode = $state<AdvisorMode>('occasion');

	onMount(() => {
		track({ name: 'page_variant', value: 'landing-b' });
	});

	function detectMode(text: string): AdvisorMode {
		const lower = text.toLowerCase();
		if (
			lower.includes('died') ||
			lower.includes('lost') ||
			lower.includes('loss') ||
			lower.includes('death') ||
			lower.includes('funeral') ||
			lower.includes('sympathy') ||
			lower.includes('pet')
		)
			return 'sympathy';
		if (
			lower.includes('wedding') ||
			lower.includes('bride') ||
			lower.includes('groom') ||
			lower.includes('bouquet') ||
			lower.includes('buttonhole')
		)
			return 'wedding';
		return 'occasion';
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const content = draft.trim();
		if (!content || loading) return;

		error = '';
		mode = detectMode(content);
		draft = '';
		messages = [];
		loading = true;

		try {
			const response = await fetch('/api/advise', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ mode, messages: [{ role: 'user', content }] })
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.error ?? 'The advisor could not answer just now.');
			messages = [
				{ role: 'user', content },
				{ role: 'assistant', content: data.message }
			];
			track({ name: 'advice_reached' });
		} catch (caught) {
			error = caught instanceof Error ? caught.message : 'The advisor could not answer just now.';
		} finally {
			loading = false;
		}
	}
</script>

<SeoHead
	title="FlowersFor &mdash; The flowers are the easy part"
	description="Tell us what&rsquo;s happened and we&rsquo;ll recommend exactly what to get &mdash; and write the card too. Flowers for any moment, retirement, new baby, apology and more."
	canonical="https://flowersfor.co.uk/landing-b"
/>

<main class="home-shell landing-b">
	<section class="landing-hero">
		<h1 class="landing-hero__headline">The flowers are the easy part.</h1>

		<article class="worked-example" aria-label="A worked example">
			<p class="worked-example__situation">My sister just had her first baby</p>
			<p class="worked-example__flowers">
				<strong>The flowers:</strong>
				Freesias and ranunculus in soft pinks, creams and whites &mdash; bright and new, and
				nothing so heavily scented it overwhelms a house already running on no sleep. Have them
				delivered arranged in a jar or box, not a wrap, so nobody&rsquo;s hunting for a vase
				one-handed.
			</p>
			<p class="worked-example__card">
				<strong>The card:</strong>
				&ldquo;Welcome, little one &mdash; you&rsquo;ve landed in the right family. And to the
				new mum: sleep when the baby sleeps, take every offered cuppa and every offered arm, and
				we&rsquo;ll be round with more flowers before the first bunch has dropped.&rdquo;
			</p>
		</article>

		<p class="landing-hero__pitch">We write the card too. Tell us what&rsquo;s happened.</p>

		<form class="hero-advisor__form" onsubmit={handleSubmit}>
			<label for="hero-input" class="sr-only">Describe your situation</label>
			<div class="hero-advisor__input-row">
				<input
					id="hero-input"
					type="text"
					bind:value={draft}
					placeholder="Describe your situation in a few words&hellip;"
					onfocus={() => track({ name: 'input_focus' })}
					disabled={loading}
					autocomplete="off"
				/>
				<button type="submit" disabled={loading || !draft.trim()}>
					{loading ? 'Thinking&hellip;' : 'Go'}
				</button>
			</div>
		</form>

		{#if messages.length > 0}
			<div class="hero-advisor__response" aria-live="polite">
				{#each messages as message}
					<div class={`resp-message resp-message--${message.role}`}>{message.content}</div>
				{/each}
			</div>

			{#if getLiveAffiliateLinksForMode(mode).length > 0}
				<div class="hero-advisor__affiliate">
					<p>{affiliateDisclosure}</p>
					<div>
						{#each getLiveAffiliateLinksForMode(mode) as link}
							<a href={link.url} rel="sponsored nofollow noopener" target="_blank">
								<strong>{link.label}</strong>
								<span>{link.sublabel}</span>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			<p class="hero-advisor__continue">
				<a href="/{mode}">Continue chatting with the {mode} advisor &rarr;</a>
			</p>
		{/if}

		{#if error}
			<div class="hero-advisor__fallback" aria-live="polite">
				<p class="hero-advisor__fallback-note">
					The advisor isn&rsquo;t available right now. Here&rsquo;s what we&rsquo;d tell you
					for this situation:
				</p>
				<div class="hero-advisor__fallback-examples">
					<div class="fallback-example">
						<strong>In the meantime</strong>
						<p>
							Ask in the {mode} advisor for the full recommendation &mdash; the card is the
							part we write for you.
						</p>
					</div>
				</div>
				<p class="hero-advisor__fallback-cta">
					<a href="/{mode}">More advice for {mode} flowers &rarr;</a>
				</p>
			</div>
		{/if}

		{#if loading}
			<div class="hero-advisor__thinking" aria-live="polite">
				<span class="hero-advisor__thinking-label">Finding the right flowers</span>
				<span class="thinking-dots" aria-hidden="true"><span></span><span></span><span></span></span>
			</div>
		{/if}
	</section>

	<section class="how-it-works">
		<h2>How it works</h2>
		<div class="steps-grid">
			<div class="step">
				<h3>1. Tell us what&rsquo;s happened.</h3>
				<p>In your own words &mdash; &ldquo;my sister&rsquo;s had a baby,&rdquo; &ldquo;my neighbour&rsquo;s husband died,&rdquo; &ldquo;I forgot our anniversary.&rdquo;</p>
			</div>
			<div class="step">
				<h3>2. See what fits.</h3>
				<p>We match flowers to the situation: what they mean, what they cost, what to avoid.</p>
			</div>
			<div class="step">
				<h3>3. Get the words.</h3>
				<p>The card is the hard part. We give you something to write that doesn&rsquo;t sound like a greetings card.</p>
			</div>
			<div class="step">
				<h3>4. Send with confidence.</h3>
				<p>Order from a florist you trust &mdash; we&rsquo;ll point you to good ones.</p>
			</div>
		</div>
	</section>

	<section class="example-cards">
		<h2>See it work</h2>
		<div class="example-grid">
			<article class="example-card">
				<h3>My boss who&rsquo;s retiring</h3>
				<p class="example-card__label"><strong>The flowers:</strong> Something structural and lasting &mdash; an orchid or a planted arrangement rather than a cut bouquet. It says &ldquo;we thought about this&rdquo; and survives the week of leaving drinks.</p>
				<p class="example-card__label"><strong>The card:</strong> &ldquo;Thirty years of showing the rest of us how it&rsquo;s done. The place won&rsquo;t be the same &mdash; enjoy every unscheduled Monday.&rdquo;</p>
			</article>
			<article class="example-card">
				<h3>My neighbour whose husband died</h3>
				<p class="example-card__label"><strong>The flowers:</strong> White lilies or white roses &mdash; quiet, traditional, and right. Avoid anything bright or scented-showy; this is not a bouquet that should announce itself.</p>
				<p class="example-card__label"><strong>The card:</strong> &ldquo;I&rsquo;m so sorry about John. No need to reply to this &mdash; just know we&rsquo;re next door, and the offer of anything at all is a standing one.&rdquo;</p>
			</article>
			<article class="example-card">
				<h3>I forgot our anniversary</h3>
				<p class="example-card__label"><strong>The flowers:</strong> Not red roses &mdash; that&rsquo;s the panic buy and she&rsquo;ll know it. Her actual favourites if you know them; peonies or ranunculus if you don&rsquo;t. The effort of specificity is the apology.</p>
				<p class="example-card__label"><strong>The card:</strong> &ldquo;I got the date wrong and I know it. This isn&rsquo;t the make-up gift &mdash; dinner on Friday is. This is just because you deserved flowers on the day.&rdquo;</p>
			</article>
		</div>
	</section>
</main>

<style>
	.landing-b .landing-hero {
		padding-top: clamp(2rem, 5vw, 4rem);
	}

	.landing-hero__headline {
		font-size: clamp(2.8rem, 9vw, 6.5rem);
		margin-bottom: 1.25rem;
	}

	.landing-hero__pitch {
		font-size: clamp(1.05rem, 2vw, 1.3rem);
		color: rgba(43, 41, 36, 0.78);
		margin: 1.5rem 0 0.9rem;
	}

	.worked-example {
		display: grid;
		gap: 0.9rem;
		max-width: 720px;
		padding: clamp(1.1rem, 3vw, 1.6rem);
		background: var(--paper);
		border: 1px solid rgba(49, 79, 66, 0.14);
		border-radius: 1.8rem;
		box-shadow: 0 12px 32px rgba(38, 48, 37, 0.06);
	}

	.worked-example__situation {
		margin: 0;
		color: var(--rose);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.78rem;
		font-weight: 600;
	}

	.worked-example__flowers {
		margin: 0;
		color: rgba(43, 41, 36, 0.82);
		line-height: 1.6;
	}

	.worked-example__flowers strong,
	.worked-example__card strong {
		color: var(--sage-deep);
		font-weight: 600;
	}

	.worked-example__card {
		margin: 0;
		padding: 0.9rem 1rem;
		border-left: 3px solid var(--rose-soft);
		background: rgba(255, 250, 241, 0.7);
		border-radius: 0.6rem;
		color: var(--sage-deep);
		font-family: Fraunces, Georgia, serif;
		font-style: italic;
		line-height: 1.6;
	}
</style>