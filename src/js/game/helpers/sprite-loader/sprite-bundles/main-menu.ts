
import mainMenuBackground from '../../../../../assets/sprites/ui/menu-panel.png';

import mainMenuButton from '../../../../../assets/sprites/ui/menu-button.png';

// TODO: DELETE THIS
import mainMenuBackgroundSquare from '../../../../../assets/sprites/ui/menu-panel-square.png';
import phaserLogo from '../../../../../assets/phaser3-logo.png';

import spriteLoader from '../sprite-loader';

export default (context: Phaser.Scene) => {
	const spritesToLoad: SpritesToLoadArray = [
		{
			id: 'mainMenuBackground',
			path: mainMenuBackground
		},
		{
			id: 'mainMenuButton',
			path: mainMenuButton
		},
		// TODO: DELETE THIS
		{
			id: 'logo',
			path: phaserLogo
		},
		{
			id: 'mainMenuBackgroundSquare',
			path: mainMenuBackgroundSquare
		}
	];

	spriteLoader(context, spritesToLoad);
};
