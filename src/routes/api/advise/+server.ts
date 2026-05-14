import { json } from '@sveltejs/kit';

import { callAnthropicAdvisor, parseAdvisorRequest } from '$lib/api';

export async function POST({ request }) {
	const parsed = parseAdvisorRequest(await request.json().catch(() => null));

	if (!parsed) {
		return json({ error: 'Send a mode and at least one message.' }, { status: 400 });
	}

	const result = await callAnthropicAdvisor(parsed);
	return json(result.body, { status: result.status });
}
