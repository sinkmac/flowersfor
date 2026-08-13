// Split-test root handler.
//
// Serves either the existing homepage (variant "a") or /landing-b (variant "b").
// The assignment is a 50/50 coin-flip on first visit and is sticky per session:
// once a visitor has a variant cookie, every root load honours it, so someone who
// lands on B stays on B (and someone on A stays on A) for the whole session.
//
// /landing-b is never redirected away from — it's a real parallel route — but once
// the cookie exists on one variant, root loads always resolve to that variant.

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const VARIANT_COOKIE = 'ff_variant';

export const load: PageServerLoad = ({ cookies, url }) => {
	const existing = cookies.get(VARIANT_COOKIE);

	if (existing === 'b') {
		// Sticky: a visitor already on B keeps landing on B for the whole session.
		throw redirect(302, '/landing-b');
	}

	if (existing === 'a') {
		// Sticky: a visitor already on A keeps the homepage.
		return {};
	}

	// First visit — 50/50 coin-flip.
	const variant: 'a' | 'b' = Math.random() < 0.5 ? 'a' : 'b';

	cookies.set(VARIANT_COOKIE, variant, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		// Secure only when served over HTTPS so local/http previews still work.
		secure: url.protocol === 'https:'
	});

	if (variant === 'b') {
		throw redirect(302, '/landing-b');
	}

	return {};
};