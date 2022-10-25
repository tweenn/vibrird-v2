import Phaser from 'phaser';

export default {
	type: Phaser.AUTO,
	parent: 'game',
	backgroundColor: '#33A5E7',
	scale: {
		width: 720,
		height: 1280,
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
};
