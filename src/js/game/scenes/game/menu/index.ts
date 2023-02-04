import Phaser from 'phaser';

import {
	loadMainMenu
} from '../../../helpers/sprite-loader';

import {
	buttonBluetooth,
	buttonNewGame,
	buttonAbout
} from './buttons';

import bySomeone from './by-someone';

import {
	overlayAgeConsente,
	overlayNoBluetooth
} from './overlay';

export default class GameMenu extends Phaser.Scene {
	constructor() {
		super('GameMenuScene');
	}

	preload() {
		loadMainMenu(this);
	}

	create() {
		this.scene.moveUp();
		this.menuCreate();
	}

	menuCreate() {
		const width = this.cameras.main.width;
		const height = this.cameras.main.height;

		const logo = this.add.image(720 * 0.5, 100, 'logo');

		this.tweens.add({
			targets: logo,
			y: 180,
			duration: 1500,
			ease: 'Sine.inOut',
			yoyo: true,
			repeat: -1
		});

		const mainMenuBackground = this.add.image(width * 0.5, height * 0.55, 'main-menu-background');
		mainMenuBackground.scale = 0.75;

		buttonNewGame(this);
		buttonBluetooth(this);
		buttonAbout(this);

		bySomeone(this);

		if (!window.hasBluetooth) {
			overlayNoBluetooth(this);
		}

		if (!window.ageConsent) {
			overlayAgeConsente(this);
		}
	}
}
