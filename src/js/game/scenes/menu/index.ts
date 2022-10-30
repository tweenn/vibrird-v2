import Phaser from 'phaser';

import {
	loadForestBackground,
	loadMainMenu
} from '../../helpers/sprite-loader';

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

import addForestBackgroundAnimations from '../../helpers/forest-background-animations';

export default class Menu extends Phaser.Scene {
	constructor() {
		super('MenuScene');
	}

	preload() {
		loadForestBackground(this);
		loadMainMenu(this);
	}

	create() {
		const width = this.cameras.main.width;
		const height = this.cameras.main.height;

		addForestBackgroundAnimations(this, 75000);

		const logo = this.add.image(720 * 0.5, 100, 'logo');

		this.tweens.add({
			targets: logo,
			y: 180,
			duration: 1500,
			ease: 'Sine.inOut',
			yoyo: true,
			repeat: -1
		});

		const mainMenuBackground = this.add.image(width * 0.5, height * 0.55, 'mainMenuBackground');
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
