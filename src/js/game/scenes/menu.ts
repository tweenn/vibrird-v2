import Phaser from 'phaser';

import forestBackground0000 from '../../../assets/sprites/background/forest-0000.png'
import forestBackground0001 from '../../../assets/sprites/background/forest-0001.png'
import forestBackground0002 from '../../../assets/sprites/background/forest-0002.png'
import forestBackground0003 from '../../../assets/sprites/background/forest-0003.png'
import forestBackground0004 from '../../../assets/sprites/background/forest-0004.png'
import forestBackground0005 from '../../../assets/sprites/background/forest-0005.png'
import forestBackground0006 from '../../../assets/sprites/background/forest-0006.png'
import forestBackground0007 from '../../../assets/sprites/background/forest-0007.png'
import forestBackground0008 from '../../../assets/sprites/background/forest-0008.png'
import forestBackground0009 from '../../../assets/sprites/background/forest-0009.png'

import phaserLogo from '../../../assets/phaser3-logo.png';

type ImageObject = {
	id: string,
	path: string,
	gameObject: Phaser.GameObjects.Image | undefined
}

type ImageGroup = Array<ImageObject>;

export default class Menu extends Phaser.Scene {
	animationBaseVelocity = 15000;

	images: ImageGroup = [
		{
			id: 'logo',
			path: phaserLogo,
			gameObject: undefined
		},
		{
			id: 'bg0000',
			path: forestBackground0000,
			gameObject: undefined
		},
		{
			id: 'bg0001',
			path: forestBackground0001,
			gameObject: undefined
		},
		{
			id: 'bg0002',
			path: forestBackground0002,
			gameObject: undefined
		},
		{
			id: 'bg0003',
			path: forestBackground0003,
			gameObject: undefined
		},
		{
			id: 'bg0004',
			path: forestBackground0004,
			gameObject: undefined
		},
		{
			id: 'bg0005',
			path: forestBackground0005,
			gameObject: undefined
		},
		{
			id: 'bg0006',
			path: forestBackground0006,
			gameObject: undefined
		},
		{
			id: 'bg0007',
			path: forestBackground0007,
			gameObject: undefined
		},
		{
			id: 'bg0008',
			path: forestBackground0008,
			gameObject: undefined
		},
		{
			id: 'bg0009',
			path: forestBackground0009,
			gameObject: undefined
		}
	];

	constructor() {
		super('MenuScene');
	}

	preload() {
		this.images.forEach((imageObject: ImageObject) => {
			this.load.image(imageObject.id, imageObject.path);
		});
	}

	create() {
		const bg0009a = this.add.image(0, 0, 'bg0009');
		const bg0009b = this.add.image(0, 0, 'bg0009');
		const bg0008a = this.add.image(0, 0, 'bg0008');
		const bg0008b = this.add.image(0, 0, 'bg0008');
		const bg0007a = this.add.image(0, 0, 'bg0007');
		const bg0007b = this.add.image(0, 0, 'bg0007');
		const bg0006a = this.add.image(0, 0, 'bg0006');
		const bg0006b = this.add.image(0, 0, 'bg0006');
		const bg0005a = this.add.image(0, 0, 'bg0005');
		const bg0005b = this.add.image(0, 0, 'bg0005');
		const bg0004a = this.add.image(0, 0, 'bg0004');
		const bg0004b = this.add.image(0, 0, 'bg0004');
		const bg0003a = this.add.image(0, 0, 'bg0003');
		const bg0003b = this.add.image(0, 0, 'bg0003');
		const bg0002a = this.add.image(0, 0, 'bg0002');
		const bg0002b = this.add.image(0, 0, 'bg0002');
		const bg0001a = this.add.image(0, 0, 'bg0001');
		const bg0001b = this.add.image(0, 0, 'bg0001');
		const bg0000a = this.add.image(0, 0, 'bg0000');
		const bg0000b = this.add.image(0, 0, 'bg0000');

		const logo = this.add.image(720 * 0.5, 150, 'logo');

		const backgroundImageryA = [
			bg0000a,
			bg0001a,
			bg0002a,
			bg0003a,
			bg0004a,
			bg0005a,
			bg0006a,
			bg0007a,
			bg0008a,
			bg0009a,
		];

		const backgroundImageryB = [
			bg0000b,
			bg0001b,
			bg0002b,
			bg0003b,
			bg0004b,
			bg0005b,
			bg0006b,
			bg0007b,
			bg0008b,
			bg0009b,
		];

		[
			...backgroundImageryA,
			...backgroundImageryB
		].forEach((imageObject) => {
			imageObject.scale = 3.5;
			imageObject.originX = 0;
			imageObject.displayOriginX = 0;
		});

		backgroundImageryB.forEach((imageObject) => {
			imageObject.displayOriginX = -928;
		});

		const defaultTween = {
			x: -928 * 3.5,
			ease: 'Linear',
			yoyo: false,
			repeat: -1
		}

		this.tweens.add({
			...defaultTween,
			targets: [
				bg0000a,
				bg0000b
			],
			duration: this.animationBaseVelocity
		});

		this.tweens.add({
			...defaultTween,
			targets: [
				bg0001a,
				bg0001b,
				bg0002a,
				bg0002b
			],
			duration: this.animationBaseVelocity + 1000
		});

		this.tweens.add({
			...defaultTween,
			targets: [
				bg0003a,
				bg0003b,
				bg0004a,
				bg0004b,
				bg0005a,
				bg0005b,
			],
			duration: this.animationBaseVelocity + 3000
		});

		this.tweens.add({
			...defaultTween,
			targets: [
				bg0006a,
				bg0006b,
				bg0007a,
				bg0007b,
			],
			duration: this.animationBaseVelocity + 7000
		});

		this.tweens.add({
			...defaultTween,
			targets: [
				bg0008a,
				bg0008b,
				bg0009a,
				bg0009b,
			],
			duration: this.animationBaseVelocity + 12000
		});

		this.tweens.add({
			targets: logo,
			y: 360,
			duration: 1500,
			ease: 'Sine.inOut',
			yoyo: true,
			repeat: -1
		});
	}
}
