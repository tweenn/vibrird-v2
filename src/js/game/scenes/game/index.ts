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
		const gameBackgroundScene = this.scene.get('GameBackgroundScene');
		const timeScaleDialation = gameBackgroundScene.timeScaleDialation.MODE_EASY;
		gameBackgroundScene.changeAnimationsVelocity(timeScaleDialation);

		this.scene.get('GameMenuScene').scene.stop();
		this.scene.launch('GameModeEasyScene');
	}

	loadHardMode() {
		// this.scene.get('GameMenuScene').scene.stop();
		// this.scene.launch('GameModeHardScene');
	}

	reloadMenu() {
		const gameBackgroundScene = this.scene.get('GameBackgroundScene');
		const timeScaleDialation = gameBackgroundScene.timeScaleDialation.MENU;
		gameBackgroundScene.changeAnimationsVelocity(timeScaleDialation);

		this.scene.get('GameModeEasyScene').scene.stop();
		this.scene.get('GameMenuScene').scene.start();
	}
};
