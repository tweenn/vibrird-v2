import GameScene from "./game";

export default class GameModeNormal extends GameScene {
	constructor() {
		super('GameModeNormalScene');

		this.gameOverByBoundary = true;
	}
};
