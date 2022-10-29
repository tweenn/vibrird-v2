import pipeBody from '../../../../../assets/sprites/pipe/pipe-body.png';
import pipeFooter from '../../../../../assets/sprites/pipe/pipe-footer.png';

import coin from '../../../../../assets/sprites/coin/coin.png';
import bird from '../../../../../assets/sprites/bird/vibrird.png';

import spriteLoader from '../sprite-loader';

export default (context: Phaser.Scene) => {
	const spritesToLoad: SpritesToLoadArray = [
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
		}
	];

	spriteLoader(context, spritesToLoad);
};
