
export default (context: Phaser.Scene, {
	position = {
		x: 0,
		y: 0
	}
}) => {
	const button = context.add.image(position.x, position.y, 'menu-button-small')
			.setScale(0.5)
			.setOrigin(0, 0)
			.setInteractive();
		
		button.on('pointerover', () => {
			button.setTint(0xff8585);
		});

		button.on('pointerout', () => {
			button.clearTint();
		});
	
	return button;
};
