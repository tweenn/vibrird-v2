
import addButton from "../add-button";
import { overlayAbout } from '../overlay';

export default (context: Phaser.Scene) => {
	const button = addButton(context, {
		buttonSpaceY: 190,
		title: {
			text: 'ABOUT',
			fontSize: '32px'
		}
	}).button;

	button.on('pointerdown', () => {
		overlayAbout(context);
	});
}
