
import spriteLoader from '../sprite-loader';

import iconSettings from '../../../../../assets/sprites/icons/settings.svg';
import iconPause from '../../../../../assets/sprites/icons/pause.svg';
import iconPlay from '../../../../../assets/sprites/icons/play.svg';

export default (context: Phaser.Scene) => {
	const spritesToLoad: SpritesToLoadArray = [
		{
			id: 'icon-settings',
			path: iconSettings,
			type: 'svg'
		},
		{
			id: 'icon-pause',
			path: iconPause,
			type: 'svg'
		},
		{
			id: 'icon-play',
			path: iconPlay,
			type: 'svg'
		},
];

	spriteLoader(context, spritesToLoad);
};
