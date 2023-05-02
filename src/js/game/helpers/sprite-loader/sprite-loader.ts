
export default (context: Phaser.Scene, spritesToLoad: SpritesToLoadArray) => {
	spritesToLoad.forEach((imageObject: SpritesToLoadObject) => {
		const id = imageObject.id;
		const path = imageObject.path;

		const type: string = imageObject?.type || 'image';

		if (type === 'spritesheet') {
			const frameWidth = imageObject.properties?.width || 0;
			const frameHeight = imageObject.properties?.height || 0;
			const endFrame = imageObject.properties?.frames || 1;

			context.load.spritesheet(id, path, { frameWidth, frameHeight, endFrame });
		} else {
			context.load?.[type](id, path);
		}
	});
};
