
import addButton from '../helpers/add-button';
import addOverlay from '../helpers/add-overlay';

export default (context: Phaser.Scene) => {
	const overlayClose = () => {
		[
			buttonEasy,
			buttonHardcore
		].forEach((target) => {
			target.button.destroy();
			target.text.destroy();
		});
	};

	addOverlay(context, {
		buttonText: 'BACK',
		buttonCallBack: overlayClose
	});

	const buttonEasy = addButton(context, {
		buttonSpaceY: -200,
		title: {
			text: 'Easy',
			fontSize: '32px'
		}
	});

	const buttonHardcore = addButton(context, {
		buttonSpaceY: -10,
		title: {
			text: 'Hardcore',
			fontSize: '32px'
		}
	});

	buttonEasy.button .on('pointerdown', () => {
		context.scene.get('GameScene').loadEasyMode();
	});
	buttonHardcore.button.on('pointerdown', () => {
		context.scene.get('GameScene').loadHardMode();
	});
};
