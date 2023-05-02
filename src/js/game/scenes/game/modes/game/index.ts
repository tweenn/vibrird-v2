import Phaser from 'phaser';

import addButton from './helpers/add-button';

import randomNumber from '../../../../../helpers/random-number';

import isGodMode from '../../../../helpers/god-mode';

export default class GameMode extends Phaser.Scene {
	isGodMode: boolean = false;

	coinValue: number = 0;
	uiCoinValue: Phaser.GameObjects.Text | undefined;

	bird: Phaser.GameObjects.Sprite | undefined;
	boundary: Phaser.GameObjects.Rectangle | undefined;
	touchZone: Phaser.GameObjects.Rectangle | undefined;

	coins: Phaser.GameObjects.Group | undefined;
	pipeContainers: Phaser.GameObjects.Group | undefined;
	pipePhysics: Phaser.GameObjects.Group | undefined;

	buttonPauseSprite: Phaser.GameObjects.Image | undefined;

	pipeVelocity: number = 200;
	birdVelocity: number = 200;

	vibrationMinimum: number = 0.01;
	vibrationPerCoin: number = 0.01;

	gameOverByPipe: boolean = false;
	gameOverByBoundary: boolean = false;

	isPaused: boolean = false;

	pausedState = {
		birdVelocity: {
			y: 0
		}
	}

	constructor(key: string) {
		super(key);

		this.resetValues();
	}

	resetValues() {
		this.coinValue = 0;

		this.isGodMode = isGodMode();
	}

	create() {
		this.createBird();
		this.createBoundary();
		this.createPipeGroups();
		this.createPipes();
		this.addCollisions();
		this.createGameUi();
		this.createTouchZone();

		if (this.isGodMode) {
			this.debug();
		}
	}

	update() {
		const pipeContainers = this.pipeContainers?.getChildren() || [];
		pipeContainers.forEach((pipeContainer) => {
			if (pipeContainer.x < -120) {
				this.resetPipe(pipeContainer);
			}
		});
	}

	createGameUi() {
		this.createGameUiCoins();
		this.createGameUiButtons();
	}

	createGameUiCoins() {
		this.add.sprite(15, 20, 'game-coin-background')
			.setScale(0.2)
			.setOrigin(0, 0);
		
		this.add.image(177, 32, 'coin')
			.setScale(0.45)
			.setOrigin(0, 0)
		
		this.uiCoinValue = this.make.text({
			x: 173,
			y: 50,
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

	createGameUiButtons() {
		const canvasWidth = this.cameras.main.width;

		const buttonConfig = addButton(this, {
			position: {
				x: canvasWidth - 80,
				y: 10
			}
		});

		buttonConfig.on('pointerdown', () => {
			this.gameOver();
		});

		this.add.image((canvasWidth - 60), 30, 'icon-settings')
			.setOrigin(0, 0);
		
		
		const buttonPause = addButton(this, {
			position: {
				x: canvasWidth - 170,
				y: 10
			}
		});

		buttonPause.on('pointerdown', () => {
			this.isPaused = !this.isPaused;

			this.createGameUiButtonsPlay();

			if (this.isPaused) {
				this.doPause();
			} else {
				this.doPlay();
			}
		});

		this.createGameUiButtonsPlay();
	}

	createGameUiButtonsPlay() {
		const icon = !this.isPaused
			? 'icon-pause'
			: 'icon-play';

		this.buttonPauseSprite?.destroy();
		this.buttonPauseSprite = this.add.image((this.cameras.main.width - 150), 30, icon)
			.setOrigin(0, 0);
	}

	createTouchZone() {
		const y = 110;
		const touchZone = this.add.rectangle(0, y, this.cameras.main.width, this.cameras.main.height - y)
			.setOrigin(0, 0)
			.setInteractive();
		
		touchZone.on('pointerdown', () => {
			this.bird?.body?.setVelocityY(-this.birdVelocity);
		}, this);

		this.touchZone = touchZone;
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

	createPipe(startingPointXThreshold = 0) {
		const canvasHeight = this.cameras.main.height;
		const canvasHeightHalf = canvasHeight * 0.5;
		const canvasHeightQuarter = canvasHeight * 0.25;
		const canvasWidth = this.cameras.main.width;

		const pipeScale = 3.25;
		const coinScale = 0.8;

		const gameSceneCenterDistance = 150;

		const startingPoint = {
			x: canvasWidth + 64 + startingPointXThreshold,
			y: canvasHeightHalf + randomNumber(-100, 100)
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

		container.body.setVelocityX(-(this.pipeVelocity));

		this.coins.add(coin);
		this.pipeContainers.add(container);
		this.pipePhysics.add(containerTop);
		this.pipePhysics.add(containerBottom);
	}

	createPipes() {
		for (let i = 0; i < 4; i++) {
			this.createPipe(i * 215);
		}
	}

	addCollisions() {
		const boundaryOverlap = (_bird, _boundary) => {
			if (this.gameOverByBoundary) {
				this.gameOver();
			}
		};

		const pipeOverlap = (_bird, _pipe) => {
			if (this.gameOverByPipe) {
				this.gameOver();
			}
		};

		this.physics.add.overlap(this.bird, this.boundary, boundaryOverlap, null, this);
		
		this.physics.add.overlap(this.bird, this.coins, this.addPoints, null, this);

		this.physics.add.overlap(this.bird, this.pipePhysics, pipeOverlap, null, this);
	}

	addPoints(
		_bird: Phaser.GameObjects.Sprite,
		coin: Phaser.GameObjects.Image
	) {
		if (coin.visible) {
			coin.visible = false;

			this.coinValue++;
			this.uiCoinValue.text = this.coinValue.toString();

			window?.vibrirdToy?.vibrate(this.vibrationMinimum + parseFloat((this.coinValue * this.vibrationPerCoin).toFixed(2)));
		}
	}

	resetPipe(pipeContainer: Phaser.GameObjects.Group) {
		const startingPoint = {
			x: this.cameras.main.width + 64,
			y: this.cameras.main.height * 0.5 + randomNumber(-100, 100)
		};

		pipeContainer.setPosition(startingPoint.x, startingPoint.y);

		pipeContainer.list.forEach((container) => {
			container.visible = true;
		});

		pipeContainer.body.setVelocityX(-(this.pipeVelocity));
	}

	doPause() {
		console.log('pause');

		const containers = this.pipeContainers?.getChildren() || [];

		containers.forEach((container) => {
			container.body.setVelocityX(0);
		});

		this.pausedState.birdVelocity.y = this.bird?.body?.velocity.y;
		this.bird?.body?.setVelocityY(0);
		this.bird.body.allowGravity = false;

		this.anims.get('bird-fly').pause();

		this.scene.get('GameBackgroundScene').changeAnimationsVelocity(0);
	}

	doPlay() {
		console.log('play');

		const containers = this.pipeContainers?.getChildren() || [];

		containers.forEach((container) => {
			container.body.setVelocityX(-(this.pipeVelocity));
		});

		this.bird?.body?.setVelocityY(this.pausedState.birdVelocity.y);
		this.bird.body.allowGravity = true;

		this.anims.get('bird-fly').resume();

		// Need to improve this
		this.scene.get('GameBackgroundScene').changeAnimationsVelocity(4);
	}

	gameOver() {
		this.coinValue = 0;
		window?.vibrirdToy?.stop();
		this.scene.get('GameLoaderScene').reloadMenu();
	}

	debug() {
		this.input.enableDebug(this.bird);
		this.input.enableDebug(this.boundary);
		this.input.enableDebug(this.touchZone);

		const containers = this.pipeContainers?.getChildren() || [];

		containers.forEach((container) => {
			this.input.enableDebug(container);

			container.list.forEach((subContainer) => {
				this.input.enableDebug(subContainer);
			})
		});
	}
};
