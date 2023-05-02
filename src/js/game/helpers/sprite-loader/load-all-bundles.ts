
import loadForestBackground from "./sprite-bundles/forest-background";
import loadGameElements from './sprite-bundles/game-elements';
import loadMainMenu from './sprite-bundles/main-menu';
import loadIcons from './sprite-bundles/icons';

export default (context: Phaser.Scene) => {
	loadForestBackground(context);
	loadGameElements(context);
	loadMainMenu(context);
	loadIcons(context);
};
