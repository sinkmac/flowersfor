// Minimal, dependency-free analytics helper for the split-test funnel.
//
// No external analytics snippet is wired in this repo (none was present when this
// was built), so this helper:
//   1. Pushes to the standard `window.dataLayer` queue in the GA4/GTM event shape
//      (`{ event, ...props }`), so events transmit automatically once a GA4 or GTM
//      snippet is added to src/app.html with a real measurement ID — no further page
//      code changes needed.
//   2. Mirrors every event to the console as a verifiable fallback, so the funnel
//      (`page_variant` -> `input_focus` -> `advice_reached`) is observable now,
//      before any analytics account is attached.

type Trackable = {
	name: 'page_variant' | 'input_focus' | 'advice_reached';
	value?: string;
};

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

export function track(fields: Trackable): void {
	if (typeof window === 'undefined') return;

	window.dataLayer = window.dataLayer || [];
	if (typeof window.gtag === 'function') {
		window.gtag('event', fields.name, fields.value ? { value: fields.value } : undefined);
	} else {
		window.dataLayer.push(
			fields.value ? { event: fields.name, value: fields.value } : { event: fields.name }
		);
	}

	// Verifiable fallback when no analytics snippet is present.
	// eslint-disable-next-line no-console
	console.log('[flowersfor] track', fields.name, fields.value ?? '');
}