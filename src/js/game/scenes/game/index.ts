import Phaser from 'phaser';

export default class GameLoaderScene extends Phaser.Scene {
	constructor() {
		super('GameLoaderScene');
	}

	create() {
		this.scene.launch('GameBackgroundScene');
		this.scene.launch('GameMenuScene');
		// TURN AROUND
		// FIX THIS
		setTimeout(() => {
			this.loadEasyMode();
		}, 100)
	}

	loadEasyMode() {
		this.scene.get('GameBackgroundScene').changeAnimationsVelocity(4);
		this.scene.get('GameMenuScene').scene.stop();
		this.scene.launch('GameModeEasyScene');
	}

	loadHardMode() {
		// this.scene.get('GameMenuScene').scene.stop();
		// this.scene.launch('GameModeHardScene');
	}

	reloadMenu() {
		this.scene.get('GameBackgroundScene').changeAnimationsVelocity(1);
		this.scene.get('GameModeEasyScene').scene.stop();
		this.scene.get('GameMenuScene').scene.start();
	}
};
