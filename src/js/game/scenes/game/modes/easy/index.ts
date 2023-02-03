import Phaser from 'phaser';
import phaserLogo from '../../../../../../assets/phaser3-logo.png';

import {
	loadGameElements
} from '../../../../helpers/sprite-loader/';


export default class GameEasy extends Phaser.Scene {
	constructor() {
		super('GameModeEasyScene');
	}

	preload() {
		loadGameElements(this);
	}

	create() {
		this.createBoundary();
		this.createBird();
		this.createPipe();
		// this.addCollisions();
		this.debug();
	}

	update() {
		this.input.on('pointerdown', () => {
			this.bird.body.setVelocityY(-200);
		}, this);
	}

	createBoundary() {
		const width = 200;
		const height = 25;
		const canvasHeight = this.cameras.main.height;
		
		const boundary = this.add.rectangle(100, canvasHeight - height, width, height);
		boundary.setInteractive();
		this.physics.add.existing(boundary);

		boundary.body.setBounce(0);
		boundary.body.setCollideWorldBounds(false);
		boundary.body.setImmovable(true);
		boundary.body.allowGravity = false;

		this.boundary = boundary;
	}

	createBird() {
		this.anims.create({
			key: 'bird-fly',
			frames: 'bird',
			frameRate: 14,
			repeat: -1
		});

		const bird = this.add.sprite(100, 200, 'bird')
			.play('bird-fly');

		bird.scale = 0.55;
		bird.flipX = true;

		bird.setInteractive(new Phaser.Geom.Rectangle(10, 25, 120, 70), Phaser.Geom.Rectangle.Contains);
		this.physics.add.existing(bird);

		// bird.body.setVelocity(0, 100);
		bird.body.setCollideWorldBounds(true);

		this.bird = bird;
	}

	createPipe() {
		const canvasHeight = this.cameras.main.height;
		const canvasHeightHalf = canvasHeight * 0.5;
		const canvasWidth = this.cameras.main.width;

		const scale = 3.25;

		const gameSceneCenterDistance = 200;

		const startingPoint = {
			// x: canvasWidth + 64,
			x: canvasWidth - 64,
			y: canvasHeightHalf
		}

		const pipeHeadTop = this.add.image(0, 0 - gameSceneCenterDistance, 'pipehead');
		const pipeHeadBottom = this.add.image(0, 0 + gameSceneCenterDistance, 'pipehead');
		const pipeBodyTop = this.add.image(0, 0 - gameSceneCenterDistance, 'pipebody');
		const pipeBodyBottom = this.add.image(0, 0 + gameSceneCenterDistance, 'pipebody');

		[
			pipeBodyTop,
			pipeBodyBottom,
			pipeHeadTop,
			pipeHeadBottom,
		].forEach((gameObject) => {
			gameObject.scale = scale;
		});

		pipeBodyTop.scaleY = canvasHeightHalf;
		pipeBodyBottom.scaleY = canvasHeightHalf;


		pipeBodyTop.setOrigin(0.5, 1);
		pipeBodyBottom.setOrigin(0.5, 0);
		
		pipeHeadTop.flipY = true;
		pipeBodyTop.flipY = true;

		const containerTop = this.add.container(0, 0, [pipeBodyTop, pipeHeadTop])
			.setInteractive(new Phaser.Geom.Rectangle(-50, - (gameSceneCenterDistance - 32 + canvasHeightHalf), 100, canvasHeightHalf), Phaser.Geom.Rectangle.Contains);

		const containerBottom = this.add.container(0, 0, [pipeBodyBottom, pipeHeadBottom])
			.setInteractive(new Phaser.Geom.Rectangle(-50, gameSceneCenterDistance - 32 , 100, canvasHeightHalf), Phaser.Geom.Rectangle.Contains);

		const container = this.add.container(startingPoint.x, startingPoint.y, [containerTop, containerBottom]);
		this.physics.add.existing(container);

		container.body.setBounce(0);
		container.body.setCollideWorldBounds(false);
		container.body.setImmovable(false);
		container.body.allowGravity = false;

		this.input.enableDebug(containerTop);
		this.input.enableDebug(containerBottom);

		// 	.setInteractive(new Phaser.Geom.Rectangle(0, 0, 50, 20), Phaser.Geom.Rectangle.Contains);

		// console.log(container)

		// .setInteractive(new Phaser.Geom.Rectangle(0, 0, 32, 20), Phaser.Geom.Rectangle.Contains);

		// pipeHead.body.setBounce(0);
		// pipeHead.body.setCollideWorldBounds(false);
		// pipeHead.body.setImmovable(false);
		// pipeHead.body.allowGravity = false;

		// pipeHead.body.setVelocityX(-200);

		/*
			coin
		*/
	}

	addCollisions() {
		const boundaryOverlap = (bird, boundary) => {
			console.log(bird, boundary)
			this.gameOver();
		};

		this.physics.add.overlap(this.boundary, this.bird, boundaryOverlap, null, this);
	}

	gameOver() {
		window?.vibrirdToy?.stop();
		this.scene.get('GameScene').reloadMenu();
	}

	debug() {
		this.input.enableDebug(this.bird);
		this.input.enableDebug(this.boundary);
	}
};
