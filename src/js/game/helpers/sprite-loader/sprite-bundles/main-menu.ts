
import menuBackground from '../../../../../assets/sprites/ui/menu-panel.png';

// TODO: DELETE THIS
import menuBackgroundSquare from '../../../../../assets/sprites/ui/menu-panel-square.png';
import phaserLogo from '../../../../../assets/phaser3-logo.png';

import spriteLoader from '../sprite-loader';

export default (context: Phaser.Scene) => {
	const spritesToLoad: SpritesToLoadArray = [
		{
			id: 'menuBackground',
			path: menuBackground
		},
		// TODO: DELETE THIS
		{
			id: 'logo',
			path: phaserLogo
		},
		{
			id: 'menuBackgroundSquare',
			path: menuBackgroundSquare
		}
	];

	spriteLoader(context, spritesToLoad);
};
