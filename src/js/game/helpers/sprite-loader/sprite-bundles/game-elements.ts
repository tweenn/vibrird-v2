import pipeHead from '../../../../../assets/sprites/pipe/pipe-head.png';
import pipeBody from '../../../../../assets/sprites/pipe/pipe-body.png';

import coin from '../../../../../assets/sprites/coin/coin.png';
import bird from '../../../../../assets/sprites/bird/vibrird.png';

import spriteLoader from '../sprite-loader';

export default (context: Phaser.Scene) => {
	const spritesToLoad: SpritesToLoadArray = [
		{
			id: 'pipehead',
			path: pipeHead
		},
		{
			id: 'pipebody',
			path: pipeBody
		},
		{
			id: 'coin',
			path: coin
		},
		{
			id: 'bird',
			path: bird,
			type: 'spritesheet',
			properties: {
				width: 160,
				height: 150,
				frames: 7
			}
		}
	];

	spriteLoader(context, spritesToLoad);
};
