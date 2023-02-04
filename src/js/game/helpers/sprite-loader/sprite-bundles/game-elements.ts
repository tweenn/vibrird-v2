import pipeHead from '../../../../../assets/sprites/pipe/pipe-head.png';
import pipeBody from '../../../../../assets/sprites/pipe/pipe-body.png';

import coin from '../../../../../assets/sprites/coin/coin.png';
import bird from '../../../../../assets/sprites/bird/vibrird.png';

import gameCoinBackground from '../../../../../assets/sprites/ui/game-coin-background.png';

import spriteLoader from '../sprite-loader';

export default (context: Phaser.Scene) => {
	const spritesToLoad: SpritesToLoadArray = [
		{
			id: 'pipe-head',
			path: pipeHead
		},
		{
			id: 'pipe-body',
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
		},
		{
			id: 'game-coin-background',
			path: gameCoinBackground
		}
	];

	spriteLoader(context, spritesToLoad);
};
