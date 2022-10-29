
export default (context: Phaser.Scene) => {
	const width = context.cameras.main.width;
	const height = context.cameras.main.height;

	const textXAnchor = width * 0.5;
	const textYAnchor = height * 0.5;

	const progressBarXAnchor = width * 0.25;
	const progressBarYAnchor = 270;
	const progressBarWidth = width * 0.5;
	const progressBarHeight = 50;
	const progressBarRadius = 10;

	const progressBoxOutter = context.add.graphics();
	const progressBoxMid = context.add.graphics();
	const progressBoxInner = context.add.graphics();
	const progressBoxInside = context.add.graphics();
	const progressBar = context.add.graphics();

	// FIX: GRAPHICS: ANY
	const fillRoundedRect = (graphics: any = undefined, multiplier: number = 10) => {
		graphics.fillRoundedRect(
			progressBarXAnchor - multiplier,
			progressBarYAnchor - multiplier,
			progressBarWidth + multiplier * 2,
			progressBarHeight + multiplier * 2,
			progressBarRadius
		);
	}

	progressBoxOutter.fillStyle(0xfbd574, 1);
	progressBoxMid.fillStyle(0xf4a846, 1);
	progressBoxInner.fillStyle(0x9d3b3d, 1);
	progressBoxInside.fillStyle(0x241c1c, 1);

	fillRoundedRect(progressBoxOutter, 5);
	fillRoundedRect(progressBoxMid, 10);
	fillRoundedRect(progressBoxInner, 5);

	progressBoxInside.fillRoundedRect(progressBarXAnchor, progressBarYAnchor, progressBarWidth, 50, 10);

	const loadingText = context.make.text({
		x: textXAnchor,
		y: textYAnchor - 50,
		text: 'Loading...',
		style: {
			font: '32px monospace'
		}
	});
	loadingText.setOrigin(0.5, 0.5);
	
	const percentText = context.make.text({
		x: textXAnchor,
		y: textYAnchor,
		text: '0%',
		style: {
			font: '24px monospace'
		}
	});
	percentText.setOrigin(0.5, 0.5);
	
	const assetText = context.make.text({
		x: textXAnchor,
		y: textYAnchor + 50,
		text: '',
		style: {
			font: '24px monospace'
		}
	});
	assetText.setOrigin(0.5, 0.5);
	
	context.load.on('progress', function (value: number) {
		percentText.setText(`${value * 100}%`);
		progressBar.clear();
		progressBar.fillStyle(0xff6d00, 1);
		progressBar.fillRect((progressBarXAnchor + 10), (progressBarYAnchor + 10), (progressBarWidth - 20) * value, 30);
	});
	
	context.load.on('fileprogress', function (file: Phaser.Types.Loader.FileConfig) {
		assetText.setText('Loading asset: ' + file.key);
	});

	context.load.on('complete', function () {
		progressBar.destroy();
		progressBoxInside.destroy();
		loadingText.destroy();
		percentText.destroy();
		assetText.destroy();
		context.scene.start('MenuScene');
	});
};
