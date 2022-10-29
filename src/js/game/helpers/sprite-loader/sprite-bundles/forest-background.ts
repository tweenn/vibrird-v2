import forestBackground0000 from '../../../../../assets/sprites/background/forest-0000.png';
import forestBackground0001 from '../../../../../assets/sprites/background/forest-0001.png';
import forestBackground0002 from '../../../../../assets/sprites/background/forest-0002.png';
import forestBackground0003 from '../../../../../assets/sprites/background/forest-0003.png';
import forestBackground0004 from '../../../../../assets/sprites/background/forest-0004.png';
import forestBackground0005 from '../../../../../assets/sprites/background/forest-0005.png';
import forestBackground0006 from '../../../../../assets/sprites/background/forest-0006.png';
import forestBackground0007 from '../../../../../assets/sprites/background/forest-0007.png';
import forestBackground0008 from '../../../../../assets/sprites/background/forest-0008.png';
import forestBackground0009 from '../../../../../assets/sprites/background/forest-0009.png';

import spriteLoader from '../sprite-loader';

export default (context: Phaser.Scene) => {
	const spritesToLoad: SpritesToLoadArray = [
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
		}
	];

	spriteLoader(context, spritesToLoad);
};
