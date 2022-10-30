
import addOverlay from '../add-overlay';
import {
	confirm as ageConsentConfirm
} from '../../../../helpers/age-consent'

export default (context: Phaser.Scene) => {
	const overlayText = `
		This game was designed
		for adults over legal/consent age
		(18+ in the majority of countries)
		
		It doesn't contain any
		audio, visual, graphical
		or textual innapropriate
		content, but was designed
		to be played with a vibrating
		gadget for pleasure intents.

		Proceed only if you're over
		legal/consent age.
	`.split('\t').join(' ');

	addOverlay(context, {
		overlayText,
		buttonText: 'I\'M AN ADULT',
		buttonCallBack: () => {
			ageConsentConfirm();
		}
	});
};
