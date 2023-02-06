import Phaser from 'phaser';

import isGodMode from './helpers/god-mode';

export default {
	type: Phaser.AUTO,
	parent: 'game',
	backgroundColor: '#000000',
	scale: {
		width: 720,
		height: 1280,
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: isGodMode()
		}
	},
};
