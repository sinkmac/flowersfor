<script lang="ts">
	import { affiliateDisclosure, getLiveAffiliateLinksForMode } from '$lib/affiliateLinks';
	import { entryPoints, type AdvisorMode } from '$lib/prompts';

	type ChatMessage = {
		role: 'user' | 'assistant';
		content: string;
	};

	let { mode }: { mode: AdvisorMode } = $props();

	let entry = $derived(entryPoints[mode]);
	let affiliateLinksForMode = $derived(getLiveAffiliateLinksForMode(mode));
	let draft = $state('');
	let messages = $state<ChatMessage[]>([]);
	let loading = $state(false);
	let error = $state('');

	function chooseSuggestion(suggestion: string) {
		draft = suggestion;
	}

	async function sendMessage(text = draft) {
		const content = text.trim();
		if (!content || loading) return;

		error = '';
		draft = '';
		messages = [...messages, { role: 'user', content }];
		loading = true;

		try {
			const response = await fetch('/api/advise', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ mode, messages: [...messages, { role: 'user', content }] })
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.error ?? 'The advisor could not answer just now.');
			messages = [...messages, { role: 'assistant', content: data.message }];
		} catch (caught) {
			error = caught instanceof Error ? caught.message : 'The advisor could not answer just now.';
		} finally {
			loading = false;
		}
	}
</script>

<section class={`advisor advisor--${mode}`}>
	<div class="advisor__intro">
		<p class="kicker">{entry.title}</p>
		<h1>{entry.openingLine}</h1>
		<p>{entry.description}</p>
	</div>

	<div class="suggestions" aria-label="Conversation starters">
		{#each entry.suggestions as suggestion}
			<button
				type="button"
				onpointerdown={() => chooseSuggestion(suggestion)}
				onmousedown={() => chooseSuggestion(suggestion)}
				onclick={() => chooseSuggestion(suggestion)}
			>{suggestion}</button>
		{/each}
	</div>

	<div class="thread" aria-live="polite">
		{#if messages.length === 0}
			<div class="message message--assistant message--quiet">
				I’ll keep this simple. Tell me what you’re trying to say with the flowers, and I’ll steer you towards something that feels right.
			</div>
		{/if}
		{#each messages as message}
			<div class={`message message--${message.role}`}>
				{message.content}
			</div>
		{/each}
		{#if loading}
			<div class="message message--assistant message--thinking" aria-live="polite">
				<span>Finding the right words</span><span class="thinking-dots" aria-hidden="true"><span></span><span></span><span></span></span>
			</div>
		{/if}
		{#if error}
			<div class="message message--error">{error}</div>
		{/if}
	</div>

	{#if messages.some((message) => message.role === 'assistant') && affiliateLinksForMode.length > 0}
		<div class="affiliate-panel">
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

	<form class="composer" onsubmit={(event) => { event.preventDefault(); sendMessage(); }}>
		<label for="note">Write it like a note to a florist</label>
		<textarea
			id="note"
			bind:value={draft}
			rows="5"
			placeholder="e.g. flowers for my mum's 70th, she loves purple, nothing too fussy, about £40"
		></textarea>
		<button type="submit" disabled={loading || !draft.trim()}>Ask the florist</button>
	</form>
</section>
