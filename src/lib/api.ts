import { env } from '$env/dynamic/private';
import { advisorPrompts, isAdvisorMode, type AdvisorMode } from './prompts';

type AdvisorMessage = {
	role: 'user' | 'assistant';
	content: string;
};

export async function callAnthropicAdvisor(args: { mode: AdvisorMode; messages: AdvisorMessage[] }) {
	const apiKey = env.ANTHROPIC_API_KEY;

	if (!apiKey) {
		return {
			status: 503,
			body: {
				error:
					'FlowersFor is ready, but the advisor needs ANTHROPIC_API_KEY configured in Netlify before it can answer live.'
			}
		};
	}

	const response = await fetch('https://api.anthropic.com/v1/messages', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'anthropic-version': '2023-06-01',
			'x-api-key': apiKey
		},
		body: JSON.stringify({
			model: 'claude-sonnet-4-20250514',
			max_tokens: 300,
			temperature: 0.7,
			system: advisorPrompts[args.mode],
			messages: args.messages
		})
	});

	if (!response.ok) {
		const detail = await response.text();
		return {
			status: response.status,
			body: { error: 'The florist advisor could not answer just now.', detail }
		};
	}

	const data = await response.json();
	const text = data.content?.find((part: { type: string }) => part.type === 'text')?.text ?? '';

	return { status: 200, body: { message: text } };
}

export function parseAdvisorRequest(input: unknown): { mode: AdvisorMode; messages: AdvisorMessage[] } | null {
	if (!input || typeof input !== 'object') return null;
	const body = input as { mode?: unknown; messages?: unknown };
	if (typeof body.mode !== 'string' || !isAdvisorMode(body.mode)) return null;
	if (!Array.isArray(body.messages)) return null;

	const messages = body.messages
		.map((message) => {
			if (!message || typeof message !== 'object') return null;
			const item = message as { role?: unknown; content?: unknown };
			if ((item.role !== 'user' && item.role !== 'assistant') || typeof item.content !== 'string') {
				return null;
			}
			return { role: item.role, content: item.content.slice(0, 2000) };
		})
		.filter((message): message is AdvisorMessage => message !== null)
		.slice(-10);

	if (messages.length === 0) return null;
	return { mode: body.mode, messages };
}
