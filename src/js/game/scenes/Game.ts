import Phaser from 'phaser';
import phaserLogo from '../../../assets/phaser3-logo.png';

export default class Demo extends Phaser.Scene {
	constructor() {
		super('GameScene');
	}

	preload() {
		this.load.image('logo', phaserLogo);
	}

	create() {
		const logo = this.add.image(720 * 0.5, 70, 'logo');

		this.tweens.add({
			targets: logo,
			y: 360,
			duration: 1500,
			ease: 'Sine.inOut',
			yoyo: true,
			repeat: -1
		});
	}
};
