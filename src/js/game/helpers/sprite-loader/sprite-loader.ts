
export default (context: Phaser.Scene, spritesToLoad: SpritesToLoadArray) => {
	spritesToLoad.forEach((imageObject: SpritesToLoadObject) => {
		context.load.image(imageObject.id, imageObject.path);
	});
};
