import Phaser from 'phaser';
import config from './config';
import scenes from './scenes';

export default () => {
	document.getElementsByTagName('body')[0].style.backgroundColor = config.backgroundColor;

	new Phaser.Game(
		{
			...config,
			scene: scenes
		}
	);
}
