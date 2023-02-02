
import addOverlay from '../helpers/add-overlay';

export default (context: Phaser.Scene) => {
	const overlayText = `
		This game is better played
		with a bluetooth rumbling
		device connected.

		Please ensure the bluetooth
		is turned on and that
		you're using a compatible
		browser.

		For more information, please
		visit the documentation that
		will open in a new tab/window.
	`.split('\t').join(' ');

	addOverlay(context, {
		overlayText,
		buttonText: 'Okay',
		buttonCallBack: () => {
			const documentationWindow = window.open('https://www.example.com', '_blank');
		}
	});
};
