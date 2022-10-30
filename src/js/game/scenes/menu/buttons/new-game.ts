
import addButton from "../add-button";

export default (context: Phaser.Scene) => {
	const button = addButton(context, {
		buttonSpaceY: -190,
		title: {
			text: 'NEW GAME',
			fontSize: '32px'
		}
	}).button;

	button.on('pointerdown', () => {
		console.log('New Game');
	});
}
