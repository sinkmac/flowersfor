<script lang="ts">
	import { affiliateDisclosure, getLiveAffiliateLinksForMode } from '$lib/affiliateLinks';
	import { type AdvisorMode } from '$lib/prompts';

	type ChatMessage = {
		role: 'user' | 'assistant';
		content: string;
	};

	const defaultMode: AdvisorMode = 'occasion';

	type ChipDef = {
		label: string;
		mode: AdvisorMode;
		/** Context string prepended to the user message to steer the prompt without a new mode variant. */
		context?: string;
		/** Override fallback examples for error state when the default mode's aren't relevant. */
		fallbackOverride?: { title: string; text: string }[];
	};

	const bestManContext =
		"I'm in a wedding party and need to sort flowers today — buttonholes for the groom and groomsmen, corsages for mums, and thank-you bouquets for in-laws. I don't need a florist-commissioning conversation, I need to know what to buy and where in twenty minutes. Give me specific, buy-now advice with the same directness you'd use for any urgent occasion query.";

	const bestManFallback: { title: string; text: string }[] = [
		{
			title: 'Buttonholes for the groom and groomsmen — sorted today',
			text: 'For the groom: one statement flower — a garden rose or a single dahlia head — with something textural behind it like eucalyptus or rosemary. For the groomsmen: the same green but a smaller, simpler flower like a spray rose or freesia. Go to a decent local florist, not a supermarket. They\u2019ll pin them for you. Buy one spare.'
		},
		{
			title: 'Thank-you bouquets for mothers and in-laws',
			text: 'Ask the florist for a hand-tied bunch of seasonal flowers in the wedding\u2019s colour palette — doesn\u2019t need to match exactly, just not clash. Keep them simple: one hero flower (rose, dahlia, peony if in season), one filler (scabiosa, waxflower), one green. Around \u00a330\u2013\u00a340 each. Have them ready to hand over at the rehearsal dinner, not the morning of.'
		},
		{
			title: 'A corsage for the mother of the groom',
			text: 'Corsages for mums are usually brooch-style or wrist. Ask the florist for a small cluster of two or three flowers taped and pinned — not a huge wrist corsage that gets in the way of handbags and hugs. Coordinate with the mother of the bride so they don\u2019t arrive wearing the same flower.'
		}
	];

	const chipOptions: ChipDef[] = [
		{ label: 'I forgot our anniversary', mode: 'occasion' },
		{ label: 'There\'s been a loss', mode: 'sympathy' },
		{ label: "I said something stupid", mode: 'occasion' },
		{ label: 'Just because', mode: 'occasion' },
		{
			label: "Best man, no idea what I'm doing",
			mode: 'occasion',
			context: bestManContext,
			fallbackOverride: bestManFallback
		}
	];

	// Static fallback examples — matches the content on /occasion, /wedding, /sympathy
	const fallbackExamples: Record<AdvisorMode, { title: string; text: string }[]> = {
		occasion: [
			{
				title: 'Flowers for a friend who\u2019s just had a baby, under \u00a340',
				text: 'Freesias or ranunculus in soft pinks, creams, or whites. Skip lilies entirely \u2014 the scent is overwhelming in a newborn household and the pollen stains everything it touches. Order them arranged in a jar or box, not as a wrap, because nobody in that house has the energy to find a vase.'
			},
			{
				title: 'Apology flowers when you\u2019ve genuinely messed up',
				text: 'Not red roses \u2014 they read as romance, not remorse. Go for a generous hand-tied bunch of seasonal stems in warm tones: dahlias, stocks, or sunflowers depending on the time of year. Spend slightly more than feels comfortable. The flowers say you mean it; the card does the actual apologising.'
			},
			{
				title: 'Thank-you flowers for someone who put you up',
				text: 'A medium bunch of tulips, stocks, or sweet peas in season \u2014 cheerful, unfussy, nothing that demands arranging skill. Around \u00a325\u2013\u00a335 is right; bigger starts to feel like repayment rather than thanks. Send to arrive a day or two after you leave.'
			}
		],
		wedding: [
			{
				title: 'Buttonholes for a September wedding, groom plus four',
				text: 'A single spray rose with a sprig of eucalyptus each \u2014 clean, photographs well, and won\u2019t wilt by the speeches. Order six, not five: one always gets crushed in a hug before the ceremony. Ask for pinned, not magnetic, fixings if anyone is wearing tweed.'
			},
			{
				title: 'Ceremony flowers on a tight budget',
				text: 'Put the money where the photos happen: two larger arrangements at the front, nothing on the aisle. Choose what\u2019s in season that month because seasonal stems cost half what imported ones do. Move the two arrangements to the reception afterwards and they work twice.'
			},
			{
				title: 'A bridal bouquet that won\u2019t fight the dress',
				text: 'If the dress has detail, keep the bouquet simple: one flower type, one accent green, loosely tied. If the dress is plain, the bouquet can carry texture and trailing stems. Either way, ask for it slightly smaller than the florist\u2019s first suggestion.'
			}
		],
		sympathy: [
			{
				title: 'Flowers for a colleague who\u2019s lost a parent',
				text: 'White and green \u2014 lisianthus, white roses, or chrysanthemums with soft foliage. Nothing red, nothing bright. Send to their home rather than the funeral unless you\u2019ve been invited to contribute there. Keep the card line short and plain. They will remember that you sent something.'
			},
			{
				title: 'Funeral flowers when the family asked for \u201Cfamily flowers only\u201D',
				text: 'Respect it \u2014 don\u2019t send to the funeral. Instead, send a small arrangement to the family home a week or two later, when the cards have stopped and the house has gone quiet. That is when flowers actually help.'
			},
			{
				title: 'Flowers for someone whose pet has died',
				text: 'Yes, it\u2019s worth doing. A small posy \u2014 something gentle like freesias or spray roses \u2014 with a card that names the animal. Avoid anything grand; the scale should match a quiet sadness, not a state occasion.'
			}
		]
	};

	let draft = $state('');
	let mode = $state<AdvisorMode>(defaultMode);
	let messages = $state<ChatMessage[]>([]);
	let loading = $state(false);
	let error = $state('');
	let advisorStarted = $state(false);
	let activeChip = $state<ChipDef | null>(null);

	const headline = $derived(
		draft.trim()
			? `Flowers for ${draft.trim()}`
			: 'Flowers for\u00A0___'
	);

	const affiliateLinksForMode = $derived(
		advisorStarted ? getLiveAffiliateLinksForMode(mode) : []
	);

	function detectMode(text: string): AdvisorMode {
		const lower = text.toLowerCase();
		if (lower.includes('died') || lower.includes('lost') || lower.includes('loss') || lower.includes('death') || lower.includes('funeral') || lower.includes('sympathy') || lower.includes('pet')) return 'sympathy';
		if (lower.includes('wedding') || lower.includes('bride') || lower.includes('groom') || lower.includes('bouquet') || lower.includes('buttonhole')) return 'wedding';
		return 'occasion';
	}

	function chipClick(chip: ChipDef) {
		draft = chip.label;
		mode = chip.mode;
		activeChip = chip;
		startAdvisor(chip.label, chip.mode, chip.context);
	}

	async function startAdvisor(text: string, advisorMode: AdvisorMode, context?: string) {
		advisorStarted = true;
		error = '';
		messages = [];
		loading = true;

		const userContent = context ? `${context}\n\n${text}` : text;

		try {
			const response = await fetch('/api/advise', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					mode: advisorMode,
					messages: [{ role: 'user', content: userContent }]
				})
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.error ?? 'The advisor could not answer just now.');
			messages = [
				{ role: 'user', content: text },
				{ role: 'assistant', content: data.message }
			];
		} catch (caught) {
			error = caught instanceof Error ? caught.message : 'The advisor could not answer just now.';
		} finally {
			loading = false;
		}
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		const text = draft.trim();
		if (!text || loading) return;
		mode = detectMode(text);
		activeChip = null;
		startAdvisor(text, mode);
	}
</script>

<section class="hero-advisor">
	<h1 class="hero-advisor__headline">{headline}</h1>

	<p class="hero-advisor__prompt">What&#8217;s happened?</p>

	<div class="hero-advisor__chips" aria-label="Quick situations">
		{#each chipOptions as chip}
			<button
				type="button"
				class={`chip chip--${chip.mode}`}
				onclick={() => chipClick(chip)}
				disabled={loading}
			>{chip.label}</button>
		{/each}
	</div>

	<form class="hero-advisor__form" onsubmit={handleSubmit}>
		<label for="hero-input" class="sr-only">Describe your situation</label>
		<div class="hero-advisor__input-row">
			<input
				id="hero-input"
				type="text"
				bind:value={draft}
				placeholder="Describe your situation in a few words\u2026"
				disabled={loading}
				autocomplete="off"
			/>
			<button type="submit" disabled={loading || !draft.trim()}>
				{loading ? 'Thinking\u2026' : 'Go'}
			</button>
		</div>
	</form>

	<p class="hero-advisor__clarify">
		Type any situation &mdash; a funeral, an apology, a fiftieth anniversary &mdash; and we&rsquo;ll tell you which flowers to send and what to write on the card.
	</p>

	<!-- Advisor response area -->
	{#if advisorStarted && !loading}
		<!-- Success: show recommendation -->
		{#if messages.length > 0 && !error}
			<div class="hero-advisor__response" aria-live="polite">
				{#each messages as message}
					<div class={`resp-message resp-message--${message.role}`}>
						{message.content}
					</div>
				{/each}
			</div>

			{#if affiliateLinksForMode.length > 0}
				<div class="hero-advisor__affiliate">
					<p>{affiliateDisclosure}</p>
					<div>
						{#each affiliateLinksForMode as link}
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

		<!-- Error / fallback state -->
		{#if error}
			<div class="hero-advisor__fallback" aria-live="polite">
				<p class="hero-advisor__fallback-note">
					The advisor isn&rsquo;t available right now. Here&rsquo;s what we&rsquo;d tell you for this situation:
				</p>
				<div class="hero-advisor__fallback-examples">
					{#each (activeChip?.fallbackOverride ?? fallbackExamples[mode]) as example}
						<div class="fallback-example">
							<strong>{example.title}</strong>
							<p>{example.text}</p>
						</div>
					{/each}
				</div>
				<p class="hero-advisor__fallback-cta">
					<a href="/{mode}">More advice for {mode} flowers &rarr;</a>
				</p>
			</div>
		{/if}
	{/if}

	{#if loading}
		<div class="hero-advisor__thinking" aria-live="polite">
			<span class="hero-advisor__thinking-label">Finding the right flowers</span>
			<span class="thinking-dots" aria-hidden="true"><span></span><span></span><span></span></span>
		</div>
	{/if}
</section>

{#if !advisorStarted || error}
	<section class="hero-static-routes" aria-label="Browse by occasion">
		<h2>Not sure yet? Browse by situation</h2>
		<div class="door-grid">
			<a class="door door--occasion" href="/occasion">
				<p>Warm, confident, just playful enough</p>
				<h2>For an Occasion</h2>
				<span>Birthday, apology, thank you, new baby, anniversary. One confident answer.</span>
			</a>
			<a class="door door--wedding" href="/wedding">
				<p>Considered, precise, quietly aspirational</p>
				<h2>For a Wedding</h2>
				<span>Bouquets, buttonholes, ceremony and tables. Clear direction.</span>
			</a>
			<a class="door door--sympathy" href="/sympathy">
				<p>Quiet, unhurried, no upselling energy</p>
				<h2>With Sympathy</h2>
				<span>Calm, appropriate advice. No guesswork. No rush.</span>
			</a>
		</div>
	</section>
{/if}