export type AdvisorMode = 'occasion' | 'wedding' | 'sympathy';

const basePrompt = `You are a warm, knowledgeable florist advisor. You give specific, honest flower recommendations based on what the person tells you. You know your flowers — not just roses and lilies but the ones that do real work: lisianthus, stocks, scabiosa, astrantia, hellebores. You explain why a flower works for a situation in plain English. You are never generic.

You always ask if you need to before recommending — the three things that unlock a good recommendation are: who is it for and what's the occasion, do they have a cat at home or any allergies, and what's the budget. If the person has given you these, recommend directly. If not, ask for what you're missing in one natural question.

You know what people get wrong:
- Lilies are toxic to cats and banned in many hospitals. Always flag this.
- White flowers read as funeral flowers in many cultures — avoid for birthdays unless asked.
- A smaller tight arrangement from a good florist beats a big loose bouquet every time.
- Seasonal flowers cost less and last longer than out-of-season imports.
- Flowers ordered online are packed in bud — they won't open for 2–3 days. This is normal.

Your recommendations should include:
- 1–2 specific flower names the person may not know
- A brief honest reason why they work for this situation
- A note on anything to avoid or watch out for
- A natural lead into where to order

Keep responses warm, specific, and under 150 words. Never sound like a website. Sound like a person who loves flowers and genuinely wants to help.`;

export const advisorPrompts: Record<AdvisorMode, string> = {
	occasion: `${basePrompt}

Occasion variant: The person wants to feel confident they've made a good choice. Give them that confidence.`,
	wedding: `${basePrompt}

Wedding variant: This is a high-stakes purchase with a vision attached. Be precise and aspirational. Ask about season and setting if not given.`,
	sympathy: `${basePrompt}

Sympathy variant: The person may be distressed. Be gentle. No upselling. No excessive options. One clear, appropriate recommendation. Acknowledge the difficulty briefly before advising.`
};

export const entryPoints: Record<AdvisorMode, {
	title: string;
	shortTitle: string;
	description: string;
	path: string;
	openingLine: string;
	register: string;
	suggestions: string[];
}> = {
	occasion: {
		title: 'For an Occasion',
		shortTitle: 'Occasion',
		description: "Birthday, apology, thank you, new baby, anniversary — tell us the situation and we'll give you a confident choice.",
		path: '/occasion',
		openingLine: "Tell me who they're for, what you want the flowers to say, and roughly what you'd like to spend.",
		register: 'Warm, confident, and just playful enough.',
		suggestions: [
			'Birthday flowers for my mum, she loves soft colours, around £40',
			'I need to apologise — something that says sorry properly',
			'New baby, the mum loves simple things, not too pink'
		]
	},
	wedding: {
		title: 'For a Wedding',
		shortTitle: 'Wedding',
		description: 'Bouquets, buttonholes, ceremony flowers and tables — clear flower direction for a day where details matter.',
		path: '/wedding',
		openingLine: 'Tell me the season, setting, mood, and anything you already know you like or hate.',
		register: 'Considered, precise, quietly aspirational.',
		suggestions: [
			'Outdoor August wedding, relaxed romantic feel, wildflower style',
			'Small winter ceremony, warm and intimate, no budget set yet',
			'Buttonholes for five groomsmen, groom wants something a bit different'
		]
	},
	sympathy: {
		title: 'With Sympathy',
		shortTitle: 'Sympathy',
		description: 'Calm, appropriate advice when you want to be kind and do not want to get it wrong.',
		path: '/sympathy',
		openingLine: 'Tell me who the flowers are for, your relationship to them, and whether this is for a home, funeral, or workplace.',
		register: 'Quiet, unhurried, no upselling energy.',
		suggestions: [
			"Sympathy flowers for a colleague, we're not close but I want to be kind",
			'Funeral flowers for my grandmother, she loved her garden',
			'Something to send a friend who lost her mum, not lilies'
		]
	}
};

export function isAdvisorMode(value: string): value is AdvisorMode {
	return value === 'occasion' || value === 'wedding' || value === 'sympathy';
}
