
import addOverlay from '../helpers/add-overlay';

export default (context: Phaser.Scene) => {
	const overlayText = `
		This games was created by:
		@tweenn


		And utilizes:
		- Phaser 3 [MIT]
		- Buttplug.io [BSD 3]
		- Parcel Bundler [MIT]
		- Typescript [Apache License 2.0]
		- Gondor UI Package [Commercial]
	`.split('\t').join(' ');

	addOverlay(context, {
		overlayText,
		buttonText: 'CLOSE'
	});
};
