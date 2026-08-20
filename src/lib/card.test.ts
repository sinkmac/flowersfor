import assert from 'node:assert/strict';
import { splitCard, splitAtCard, replacePlatitudes, replacePlaceholders } from './card.ts';

const t = (name: string, fn: () => void): void => {
	try {
		fn();
		console.log('ok   ' + name);
	} catch (e) {
		console.error('FAIL ' + name);
		console.error(e instanceof Error ? e.message : String(e));
		process.exitCode = 1;
	}
};

// --- splitting ---
t('splits on standalone CARD: line', () => {
	const parts = splitAtCard('Flowers: roses.\n\nCARD: Thinking of you.');
	assert.ok(parts, 'expected a split');
	const [rec, card] = parts;
	assert.equal(rec, 'Flowers: roses.');
	assert.equal(card, 'Thinking of you.');
});

t('splits case-insensitively (card: inline)', () => {
	const r = splitAtCard('Roses are best. card: With my love.');
	assert.deepEqual(r, ['Roses are best.', 'With my love.']);
});

t('handles CARD: mid-paragraph without blank line', () => {
	const r = splitAtCard('Roses.\nCARD: I am sorry.');
	assert.deepEqual(r, ['Roses.', 'I am sorry.']);
});

t('returns null when no marker', () => {
	assert.equal(splitAtCard('Just advice, no card.'), null);
});

t('splitCard returns card:null when absent', () => {
	const r = splitCard('Just advice.');
	assert.deepEqual(r, { recommendation: 'Just advice.', card: null });
});

t('splitCard splits recommendation and card', () => {
	const r = splitCard('Advice.\n\nCARD: A line.');
	assert.deepEqual(r, { recommendation: 'Advice.', card: 'A line.' });
});

t('splitCard trims recommendation trailing whitespace', () => {
	const r = splitCard('Advice.   \n\nCARD: A line.');
	assert.equal(r.recommendation, 'Advice.');
});

// --- platitude guard ---
t('strips trailing platitude truncating cleanly', () => {
	assert.equal(replacePlatitudes("I'm so sorry for your loss — they're in a better place now."), "I'm so sorry for your loss.");
});

t('strips "everything happens for a reason"', () => {
	assert.equal(replacePlatitudes('Hold on. Everything happens for a reason.'), 'Hold on.');
});

t('strips "at least" opener (dropped nothing remains)', () => {
	assert.equal(replacePlatitudes('At least she had a good life.'), '');
});

t('strips "at peace" leaving the safe prefix', () => {
	assert.equal(replacePlatitudes('He is at peace now.'), 'He is.');
});

t('adds closing full stop after truncation', () => {
	assert.equal(replacePlatitudes('Thinking of you, time heals'), 'Thinking of you.');
});

t('leaves a clean card untouched', () => {
	assert.equal(replacePlatitudes('Thinking of you and your family.'), 'Thinking of you and your family.');
});

// --- placeholder guard ---
t('replaces [cat\'s name] with "your cat"', () => {
	assert.equal(
		replacePlaceholders("I'm so sorry about [cat's name] — losing a pet is a real loss."),
		"I'm so sorry about your cat — losing a pet is a real loss."
	);
});

t('replaces generic [their name] with "them"', () => {
	assert.equal(
		replacePlaceholders('Thinking of [their name] today.'),
		'Thinking of them today.'
	);
});

t('replaces [pet\'s name] with "your pet"', () => {
	assert.equal(replacePlaceholders('Sending love to [pet\'s name].'), 'Sending love to your pet.');
});

t('placeholder guard fires inside splitCard end-to-end', () => {
	const r = splitCard("Sympathy advice.\n\nCARD: I'm so sorry about [cat's name] — thinking of you.");
	assert.equal(r.card, "I'm so sorry about your cat — thinking of you.");
});