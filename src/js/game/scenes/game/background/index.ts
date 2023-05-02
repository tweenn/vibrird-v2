import Phaser from 'phaser';

const enum ENUM_TIME_DIALATION {
	STOP = 0,
	MENU = 1,
	MODE_EASY = 4,
	MODE_NORMAL = 4,
	MODE_HARD = 4
};

type TYPE_TIME_SCALE_DIALATION = {
	STOP: number,
	MENU: number,
	MODE_EASY: number,
	MODE_NORMAL: number,
	MODE_HARD: number
}

export default class GameBackground extends Phaser.Scene {

	timeScaleDialation: TYPE_TIME_SCALE_DIALATION = {
		STOP: ENUM_TIME_DIALATION.STOP,
		MENU: ENUM_TIME_DIALATION.MENU,
		MODE_EASY: ENUM_TIME_DIALATION.MODE_EASY,
		MODE_NORMAL: ENUM_TIME_DIALATION.MODE_NORMAL,
		MODE_HARD: ENUM_TIME_DIALATION.MODE_HARD,
	}

	constructor() {
		super('GameBackgroundScene');

		this.images = {};
		this.animations = [];

		this.imageWidth = 928;
		this.imageScale = 3.5;
		this.animationBaseVelocity = 75000;
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

	changeAnimationsVelocity(timeScaleDialation: ENUM_TIME_DIALATION) {
		this.animations.forEach((animation) => {
			animation.setTimeScale(timeScaleDialation);
		});
	}
}
