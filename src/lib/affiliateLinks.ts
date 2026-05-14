export const affiliateLinks = {
	floetica: {
		label: 'Order from Floetica',
		sublabel: 'Luxury same-day delivery across London',
		url: null,
		status: 'live_pending_url',
		network: 'Awin',
		geo: 'london'
	},
	interflora: {
		label: 'Order from Interflora',
		sublabel: 'Same-day delivery across the UK',
		url: null,
		status: 'pending',
		network: 'Awin',
		geo: 'uk'
	},
	toldlondon: {
		label: 'Order from Told London',
		sublabel: 'Distinctive arrangements, UK delivery',
		url: null,
		status: 'pending',
		network: 'Awin',
		geo: 'uk'
	}
} as const;

export const affiliateDisclosure =
	'FlowersFor may earn a small commission if you purchase through a link on this page. This never affects our advice.';

export const liveAffiliateLinks = Object.values(affiliateLinks).filter((link) => link.url);
