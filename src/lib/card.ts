// Pure card-splitting / platitude-guard logic for the FlowersFor advisor.
// No SvelteKit or env dependencies — importable in isolation for unit tests.

// A card must never contain a platitude that could land badly in a loss situation.
// This mirrors SongsFor's "never surface the wrong thing" — a cheap deterministic
// guard so a glib line never ships even if the model drifts from the prompt.
export const PLATITUDE_PATTERNS: [RegExp, string][] = [
	[/\b(they're|they are) in a better place\b/i, '"in a better place"'],
	[/\beverything happens for a reason\b/i, '"everything happens for a reason"'],
	[/\bat least\b/i, '"at least..."'],
	[/\bat peace\b/i, '"at peace"'],
	[/\btime (heals|will heal)\b/i, '"time heals"'],
	[/\bmove on\b/i, '"move on"'],
	[/\bget over (it|him|her|them)\b/i, '"get over it"'],
	[/\bcheer up\b/i, '"cheer up"']
];

// Returns [before, after] split on the first CARD: marker, or null if absent.
// Handles "CARD:" alone, "CARD —", and "Card:" case-insensitively, plus the
// model sometimes emitting "CARD:" mid-paragraph without a prior blank line.
export function splitAtCard(text: string): [string, string] | null {
	// The card lives on its own line after the flower advice. Match a standalone
	// line beginning with the marker (optionally bolded). Colon required so a
	// line that merely starts with the word "card" never matches.
	const match = text.match(/\n\s*\*?CARD:[ 	]*\*?\s*/i);
	if (!match || match.index === undefined) {
		// Fall back to an inline marker even without a preceding newline. Must
		// include the colon — plain "card" in running text must not match.
		const inline = text.match(/\bCARD:[ 	]*/i);
		if (!inline || inline.index === undefined) return null;
		const idx = inline.index + inline[0].length;
		return [text.slice(0, inline.index).trimEnd(), text.slice(idx).trim()];
	}

	const idx = match.index + match[0].length;
	return [text.slice(0, match.index).trimEnd(), text.slice(idx).trim()];
}

// Never surface a literal "[bracket]" placeholder the model may have emitted
// when the sender didn't give a pet's/person's name. Replace it with natural
// phrasing (e.g. "your cat", "them") so the card never ships placeholder text.
export function replacePlaceholders(card: string): string {
	return card
		// "my cat's name" / "[cat's name]"
		.replace(/\[(?:the |my )?(cat|dog|pet)'s name\]/gi, (_, animal) => `your ${animal}`)
		// generic "[their name]" / "[name]" / "[grandma's name]" etc.
		.replace(/\[[^\]\[]*\]/g, 'them');
}

export function replacePlatitudes(card: string): string {
	// If a platitude is present, truncate from its start onward rather than
	// delete mid-string (which can leave a grammatical fragment). Then tidy the
	// trailing comma/space before the cut and re-close with a full stop.
	let out = card;
	let cut: number | null = null;
	for (const [pattern] of PLATITUDE_PATTERNS) {
		const m = out.match(pattern);
		if (m && m.index !== undefined) {
			cut = cut === null ? m.index : Math.min(cut, m.index);
		}
	}
	if (cut !== null) {
		out = out.slice(0, cut).replace(/[\s,—–-]+$/, '').trim();
		if (out && !/[.!?…]$/.test(out) && out[out.length - 1] !== '"') out += '.';
	}
	return out.trim();
}

export function splitCard(
	text: string
): { recommendation: string; card: string | null } {
	if (!text) {
		return { recommendation: text, card: null };
	}

	const cardParts = splitAtCard(text);

	if (!cardParts) {
		// Model didn't emit a CARD: block. In sympathy mode, fail soft to the
		// existing message so the user still gets flower advice; a card is a bonus.
		return { recommendation: text, card: null };
	}

	const [recommendation, rawCard] = cardParts;
	const cleaned = replacePlaceholders(replacePlatitudes(rawCard));

	return { recommendation, card: cleaned };
}