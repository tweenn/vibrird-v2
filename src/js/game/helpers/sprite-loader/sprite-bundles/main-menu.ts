
import mainMenuBackground from '../../../../../assets/sprites/ui/menu-panel.png';
import mainMenuBackgroundSquare from '../../../../../assets/sprites/ui/menu-panel-square.png';

import mainMenuButton from '../../../../../assets/sprites/ui/menu-button.png';

// TODO: DELETE THIS
import phaserLogo from '../../../../../assets/phaser3-logo.png';

import spriteLoader from '../sprite-loader';

export default (context: Phaser.Scene) => {
	const spritesToLoad: SpritesToLoadArray = [
		{
			id: 'menu-background',
			path: mainMenuBackground
		},
		{
			id: 'menu-background-square',
			path: mainMenuBackgroundSquare
		},
		{
			id: 'menu-button',
			path: mainMenuButton
		},
		// TODO: DELETE THIS
		{
			id: 'logo',
			path: phaserLogo
		}
	];

	spriteLoader(context, spritesToLoad);
};
