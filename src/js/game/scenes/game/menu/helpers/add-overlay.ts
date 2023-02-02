
import addButton from './add-button';

export default (context: Phaser.Scene, {
	overlayText = '',
	buttonText = '',
	buttonCallBack = () => { }
}) => {
	const width = context.cameras.main.width * 0.5;
	const height = context.cameras.main.height * 0.5;

	const overlayBox = context.add.graphics();

	overlayBox.fillRect(
		0,
		0,
		width * 2,
		height * 2
	);

	overlayBox.setInteractive(
		new Phaser.Geom.Rectangle(0, 0, width * 2, height * 2),
		Phaser.Geom.Rectangle.Contains
	);

	overlayBox.fillStyle(0x000, 0.75);

	const overlayBackground = context.add.image(width, height, 'mainMenuBackgroundSquare');
	overlayBackground.scale = 0.7;

	const buttonClose = addButton(context, {
		buttonSpaceY: 190,
		title: {
			text: buttonText,
			fontSize: '32px'
		}
	});

	const textAbout = context.make.text({
		x: width,
		y: height,
		text: overlayText,
		style: {
			fontFamily: 'monospace',
			fontSize: '24px',
			align: 'left'
		},
		origin: {
			x: 0.5,
			y: 0.5
		}
	});

	buttonClose.button.on('pointerdown', () => {
		buttonCallBack();
		overlayBox.destroy();
		overlayBackground.destroy();
		buttonClose.button.destroy();
		buttonClose.text.destroy();
		textAbout.destroy();
	});
};
