
export default (context: Phaser.Scene, {
	buttonSpaceY = 0,
	buttonEnabled = true,
	title = {
		text: 'DUMMY',
		fontSize: '32px'
	}
}) => {
	const width = context.cameras.main.width * 0.5;
	const height = context.cameras.main.height * 0.57 + buttonSpaceY;

	const button: Phaser.GameObjects.Image = context.add.image(width, height, 'mainMenuButton').setInteractive();
	button.scale = 1.25;

	if (buttonEnabled) {
		button.on('pointerover', () => {
			button.setTint(0xff8585);
		});

		button.on('pointerout', () => {
			button.clearTint();
		});
	} else {
		button.setTint(0xa2a2a2);
	}

	const text: Phaser.GameObjects.Text = context.make.text({
		x: width,
		y: height,
		text: title.text,
		style: {
			fontFamily: 'monospace',
			fontSize: title.fontSize,
			align: 'center',
			color: buttonEnabled ? '#fff' : '#a2a2a2'
		},
		origin: {
			x: 0.5,
			y: 0.5
		}
	});

	return {
		button,
		text
	};
};
