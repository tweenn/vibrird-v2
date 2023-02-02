import Phaser from 'phaser';

import {
	loadForestBackground
} from '../../../helpers/sprite-loader';

export default class GameBackground extends Phaser.Scene {
	constructor() {
		super('GameBackgroundScene');

		this.images = {};
		this.animations = [];

		this.imageWidth = 928;
		this.imageScale = 3.5;
		this.animationBaseVelocity = 75000;
	}

	preload() {
		loadForestBackground(this);
	}

	create() {
		this.addImages();
		this.addAnimations();
	}

	addImages() {
		const backgroundImageryA = [];
		const backgroundImageryB = [];

		const imageIds = [];

		for (let i = 9; i >= 0; i--) {
			imageIds.push(`bg000${i}`);
		}

		imageIds.forEach((imageId) => {
			this.images[`${imageId}a`] = this.add.image(0, 0, imageId);
			this.images[`${imageId}b`] = this.add.image(0, 0, imageId);

			backgroundImageryA.push(this.images[`${imageId}a`]);
			backgroundImageryB.push(this.images[`${imageId}b`]);
		});

		[
			...backgroundImageryA,
			...backgroundImageryB
		].forEach((imageObject) => {
			imageObject.scale = this.imageScale;
			imageObject.originX = 0;
			imageObject.displayOriginX = 0;
		});

		backgroundImageryB.forEach((imageObject) => {
			imageObject.displayOriginX = - this.imageWidth;
		});
	}

	addAnimations() {
		const addAnimation = (targetIds, extraDuration) => {
			const targets = targetIds.map((id) => {
				return [
					this.images[`bg000${id}a`],
					this.images[`bg000${id}b`],
				];
			}).flat();

			const animation = this.tweens.add({
				x: - this.imageWidth * this.imageScale,
				ease: 'Linear',
				yoyo: false,
				repeat: -1,
				targets,
				duration: this.animationBaseVelocity + extraDuration,
			});
			
			this.animations.push(animation);
		}

		addAnimation([
			0
		], 0);

		addAnimation([
			1,
			2
		], 1000);

		addAnimation([
			3,
			4,
			5
		], 3000);

		addAnimation([
			6,
			7
		], 7000);

		addAnimation([
			8,
			9
		], 12000);
	}

	changeAnimationsVelocity(timeScaleDialation) {
		this.animations.forEach((animation) => {
			animation.setTimeScale(timeScaleDialation);
		});
	}
}
