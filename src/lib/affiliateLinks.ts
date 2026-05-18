export const affiliateLinks = {
	floetica: {
		label: 'Order from Floetica',
		sublabel: 'Luxury same-day delivery across London',
		url: 'https://www.awin1.com/cread.php?awinmid=122244&awinaffid=2860477&ued=https%3A%2F%2Ffloetica.com',
		status: 'live',
		network: 'Awin',
		geo: 'london'
	},
	gardenista: {
		label: 'Browse Gardenista',
		sublabel: 'Inspiration for flowers, plants and garden style',
		url: 'https://www.awin1.com/cread.php?awinmid=37292&awinaffid=2860477&ued=https%3A%2F%2Fwww.gardenista.com',
		status: 'live',
		network: 'Awin',
		geo: 'uk'
	},
	myflowers: {
		label: 'Order from MyFlowers',
		sublabel: 'Same-day delivery in 3 hours — London',
		url: 'https://www.awin1.com/cread.php?awinmid=48471&awinaffid=2860477&ued=https%3A%2F%2Fmyflowers.co.uk',
		status: 'live',
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

const liveAffiliateKeysByMode = {
	occasion: ['floetica', 'myflowers'],
	wedding: ['floetica', 'gardenista', 'myflowers'],
	sympathy: ['floetica', 'gardenista', 'myflowers']
} as const;

export function getLiveAffiliateLinksForMode(mode: keyof typeof liveAffiliateKeysByMode) {
	return liveAffiliateKeysByMode[mode]
		.map((key) => affiliateLinks[key])
		.filter((link) => link.url);
}

export const liveAffiliateLinks = Object.values(affiliateLinks).filter((link) => link.url);
