import Phaser from 'phaser';
import phaserLogo from '../../../../../../assets/phaser3-logo.png';

export default class GameEasy extends Phaser.Scene {
	constructor() {
		super('GameModeEasyScene');
	}

	preload() {
		this.load.image('logo', phaserLogo);
	}

	create() {
		const logo = this.add.image(720 * 0.5, 70, 'logo');

		this.tweens.add({
			targets: logo,
			y: 720,
			duration: 500,
			ease: 'Sine.inOut',
			yoyo: true,
			repeat: -1
		});

		window?.vibrirdToy?.vibrate(0.1);

		window.setTimeout(() => {
			window?.vibrirdToy?.stop();
			this.scene.get('GameScene').reloadMenu();
		}, 2000)
	}
};
