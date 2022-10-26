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

import pipeBody from '../../../assets/sprites/pipe/pipe-body.png'
import pipeFooter from '../../../assets/sprites/pipe/pipe-footer.png'

import coin from '../../../assets/sprites/coin/coin.png';
import bird from '../../../assets/sprites/bird/vibrird.png';

import menuPanel from '../../../assets/sprites/ui/menu-panel.png'
import menuPanelSquare from '../../../assets/sprites/ui/menu-panel-square.png'

import phaserLogo from '../../../assets/phaser3-logo.png';

type ImageObject = {
	id: string,
	path: string
}

type ImageGroup = Array<ImageObject>;

export default class Preload extends Phaser.Scene {

	images: ImageGroup = [
		{
			id: 'logo',
			path: phaserLogo
		},
		{
			id: 'bg0000',
			path: forestBackground0000
		},
		{
			id: 'bg0001',
			path: forestBackground0001
		},
		{
			id: 'bg0002',
			path: forestBackground0002
		},
		{
			id: 'bg0003',
			path: forestBackground0003
		},
		{
			id: 'bg0004',
			path: forestBackground0004
		},
		{
			id: 'bg0005',
			path: forestBackground0005
		},
		{
			id: 'bg0006',
			path: forestBackground0006
		},
		{
			id: 'bg0007',
			path: forestBackground0007
		},
		{
			id: 'bg0008',
			path: forestBackground0008
		},
		{
			id: 'bg0009',
			path: forestBackground0009
		},
		{
			id: 'pipebody',
			path: pipeBody
		},
		{
			id: 'pipefooter',
			path: pipeFooter
		},
		{
			id: 'coin',
			path: coin
		},
		{
			id: 'bird',
			path: bird
		},
		{
			id: 'menuPanel',
			path: menuPanel
		},
		{
			id: 'menuPanelSquare',
			path: menuPanelSquare
		}
	];

	constructor() {
		super('PreloadScene');
	}

	preload() {
		const context = this;
		const width = this.cameras.main.width;
		const height = this.cameras.main.height;

		const textXAnchor = width * 0.5;
		const textYAnchor = height * 0.5;

		const progressBarXAnchor = width * 0.25;
		const progressBarYAnchor = 270;
		const progressBarWidth = width * 0.5;
		const progressBarHeight = 50;
		const progressBarRadius = 10;

		const progressBoxOutter = this.add.graphics();
		const progressBoxMid = this.add.graphics();
		const progressBoxInner = this.add.graphics();
		const progressBoxInside = this.add.graphics();
		const progressBar = this.add.graphics();

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

		const loadingText = this.make.text({
			x: textXAnchor,
			y: textYAnchor - 50,
			text: 'Loading...',
			style: {
				font: '32px monospace'
			}
		});
		loadingText.setOrigin(0.5, 0.5);
		
		const percentText = this.make.text({
			x: textXAnchor,
			y: textYAnchor,
			text: '0%',
			style: {
				font: '24px monospace'
			}
		});
		percentText.setOrigin(0.5, 0.5);
		
		const assetText = this.make.text({
			x: textXAnchor,
			y: textYAnchor + 50,
			text: '',
			style: {
				font: '24px monospace'
			}
		});
		assetText.setOrigin(0.5, 0.5);
		
		this.load.on('progress', function (value: number) {
			percentText.setText(`${value * 100}%`);
			progressBar.clear();
			progressBar.fillStyle(0xff6d00, 1);
			progressBar.fillRect((progressBarXAnchor + 10), (progressBarYAnchor + 10), (progressBarWidth - 20) * value, 30);
		});
		
		this.load.on('fileprogress', function (file: Phaser.Types.Loader.FileConfig) {
			assetText.setText('Loading asset: ' + file.key);
		});

		this.load.on('complete', function () {
			progressBar.destroy();
			progressBoxInside.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
			context.scene.start('MenuScene');
		});

		this.images.forEach((imageObject: ImageObject) => {
			this.load.image(imageObject.id, imageObject.path);
		});
	}
}
