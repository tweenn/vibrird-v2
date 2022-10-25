import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';

export default () => {
	document.getElementsByTagName('body')[0].style.backgroundColor = config.backgroundColor;

	new Phaser.Game(
		Object.assign(config, {
			scene: [GameScene]
		})
	);
}
