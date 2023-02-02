
import addButton from "../helpers/add-button";
import { overlayNewGame } from '../overlay';

export default (context: Phaser.Scene) => {
	const button = addButton(context, {
		buttonSpaceY: -190,
		title: {
			text: 'NEW GAME',
			fontSize: '32px'
		}
	}).button;

	button.on('pointerdown', () => {
		overlayNewGame(context);
	});
}
