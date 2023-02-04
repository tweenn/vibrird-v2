import Phaser from 'phaser';

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
		this.createBird();
		this.createBoundary();
		this.createPipeGroups();
		this.createPipe();
		this.addCollisions();
		this.createGameUi();
		this.debug();
	}

	update() {
		this.input.on('pointerdown', () => {
			this.bird.body.setVelocityY(-200);
		}, this);

		const pipeContainers = this.pipeContainers.getChildren();
		pipeContainers.forEach((pipeContainer) => {
			if (pipeContainer.x < -120) {
				this.resetPipe(pipeContainer);
			}
		});
	}

	createGameUi() {
		this.add.sprite(0, 0, 'game-coin-background')
			.setScale(0.2)
			.setOrigin(0, 0);
		
		this.add.image(162, 12, 'coin')
			.setScale(0.45)
			.setOrigin(0, 0)
		
		this.uiCoinValue = this.make.text({
			x: 158,
			y: 30,
			text: this.coinValue || 0,
			style: {
				fontFamily: 'monospace',
				fontSize: '36px',
				align: 'left'
			},
			origin: {
				x: 1,
				y: 0.5
			}
		});
	}

	createBoundary() {
		const width = 200;
		const height = 25;
		const canvasHeight = this.cameras.main.height;
		
		const boundary = this.add.rectangle(100, canvasHeight - height, width, height);

		this.physics.add.existing(boundary);

		boundary.body
			.setBounce(0)
			.setCollideWorldBounds(false)
			.setImmovable(true)
			.setAllowGravity(false);

		this.boundary = boundary;
	}

	createBird() {
		const birdScale = 0.55;

		this.anims.create({
			key: 'bird-fly',
			frames: 'bird',
			frameRate: 14,
			repeat: -1
		});

		const birdSprite = this.add.sprite(0, 0, 'bird')
			.setName('bird-sprite')
			.setScale(birdScale)
			.setFlipX(true)
			.play('bird-fly');


		const bird = this.add.container(100, 200, [birdSprite])
			.setName('bird')
			.setSize(70, 45);

		this.physics.add.existing(bird);

		bird.body.setCollideWorldBounds(true);

		// bird.body.allowGravity = false;

		this.bird = bird;
	}

	createPipeGroups() {
		this.coins = this.add.group();
		this.pipeContainers = this.add.group();
		this.pipePhysics = this.add.group();
	}

	createPipe() {
		const canvasHeight = this.cameras.main.height;
		const canvasHeightHalf = canvasHeight * 0.5;
		const canvasHeightQuarter = canvasHeight * 0.25;
		const canvasWidth = this.cameras.main.width;

		const pipeScale = 3.25;
		const coinScale = 0.8;

		const gameSceneCenterDistance = 200;

		const startingPoint = {
			// x: canvasWidth + 64,
			x: canvasWidth - 64,
			y: canvasHeightHalf
		}

		const coin = this.add.image(0, 0, 'coin')
			.setName('coin')
			.setScale(coinScale);

		const pipeHeadTop = this.add.image(0, 0, 'pipe-head')
			.setName('pipeHeadTop');
		const pipeBodyTop = this.add.image(0, 0, 'pipe-body')
			.setName('pipeBodyTop');
		const pipeHeadBottom = this.add.image(0, 0, 'pipe-head')
			.setName('pipeHeadBottom');
		const pipeBodyBottom = this.add.image(0, 0, 'pipe-body')
			.setName('pipeBodyBottom');

		[
			pipeBodyTop,
			pipeBodyBottom,
			pipeHeadTop,
			pipeHeadBottom,
		].forEach((gameObject) => {
			gameObject.setScale(pipeScale);
		});

		[
			pipeBodyTop,
			pipeBodyBottom
		].forEach((gameObject) => {
			gameObject.scaleY = canvasHeightHalf;
		});

		[
			pipeHeadTop,
			pipeBodyTop
		].forEach((gameObject) => {
			gameObject
				.setFlipY(true)
				.setOrigin(0.5, 1)
				.setPosition(0, canvasHeightQuarter);
		});

		[
			pipeHeadBottom,
			pipeBodyBottom
		].forEach((gameObject) => {
			gameObject
				.setOrigin(0.5, 1)
				.setPosition(0, canvasHeightQuarter);
		});

		pipeHeadBottom.setY(- (canvasHeightQuarter - pipeHeadBottom.displayHeight));

		const containerTop = this.add.container(0, -(canvasHeightQuarter), [pipeBodyTop, pipeHeadTop]);
		containerTop
			.setName('containerTop')
			.setSize(100, canvasHeightHalf)
			.setY(containerTop.y - gameSceneCenterDistance);

		const containerBottom = this.add.container(0, canvasHeightQuarter, [pipeBodyBottom, pipeHeadBottom]);
		containerBottom
			.setName('containerBottom')
			.setSize(100, canvasHeightHalf)
			.setY(containerBottom.y + gameSceneCenterDistance);

		const container = this.add.container(startingPoint.x, startingPoint.y, [containerTop, containerBottom, coin])
			.setName('container')
			.setSize(1, 1);

		[
			coin,
			containerTop,
			containerBottom,
			container
		].forEach((gameObject) => {
			this.physics.add.existing(gameObject);

			gameObject.body.setBounce(0);
			gameObject.body.setCollideWorldBounds(false);
			gameObject.body.setImmovable(false);
			gameObject.body.allowGravity = false;
		});

		container.body.setVelocityX(-200);

		this.coins.add(coin);
		this.pipeContainers.add(container);
		this.pipePhysics.add(containerTop);
		this.pipePhysics.add(containerBottom);

		/*
			coin
		*/
		this.input.enableDebug(containerTop);
		this.input.enableDebug(containerBottom);
		this.input.enableDebug(container);
	}

	addCollisions() {
		const boundaryOverlap = (bird, boundary) => {
			this.gameOver();
		};

		const pipeOverlap = (bird, pipe) => {
			// console.log(bird, pipe);
		};

		const coinOverlap = (bird, coin) => {
			if (coin.visible) {
				coin.visible = false;

				this.coinValue = this.coinValue || 0;
				this.coinValue++;
				this.uiCoinValue.text = this.coinValue;
			}
		};

		this.physics.add.overlap(this.bird, this.boundary, boundaryOverlap, null, this);
		
		this.physics.add.overlap(this.bird, this.coins, coinOverlap, null, this);

		this.physics.add.overlap(this.bird, this.pipePhysics, pipeOverlap, null, this);
	}

	resetPipe(pipeContainer) {
		pipeContainer.list.forEach((container) => {
			container.visible = true;
		});


		pipeContainer.x = 1200;
	}

	gameOver() {
		window?.vibrirdToy?.stop();
		this.scene.get('GameScene').reloadMenu();
	}

	debug() {
		this.input.enableDebug(this.bird);
		this.input.enableDebug(this.boundary);

		const containers = this.pipeContainers.getChildren();

		containers.forEach((container) => {
			this.input.enableDebug(container);

			container.list.forEach((subContainer) => {
				this.input.enableDebug(subContainer);
			})
		});
	}
};
