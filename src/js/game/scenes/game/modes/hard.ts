import GameScene from "./game";

export default class GameModeHard extends GameScene {
	constructor() {
		super('GameModeHardScene');

		this.gameOverByBoundary = true;
		this.gameOverByPipe = true;
	}
};
