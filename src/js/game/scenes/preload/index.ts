import Phaser from 'phaser';

import {
	loadAllBundles
} from '../../helpers/sprite-loader';

import preloaderExecution from './preloader-execution';

export default class Preload extends Phaser.Scene {
	constructor() {
		super('PreloadScene');
	}

	preload() {
		preloaderExecution(this);
		loadAllBundles(this);
	}
};
