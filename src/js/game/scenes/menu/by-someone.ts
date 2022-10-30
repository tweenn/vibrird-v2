
export default (context: Phaser.Scene) => {
	const width = context.cameras.main.width;
	const height = context.cameras.main.height;

	const fontSize = 28;
	const text = 'by @tweenn';
	const padding = 8;

	context.make.text({
		x: width - fontSize - (text.length * 8) - padding,
		y: height - fontSize - (padding * 2),
		text,
		style: {
			fontFamily: 'monospace',
			fontSize: `${fontSize}px`,
			align: 'right'
		},
		origin: {
			x: 0.5,
			y: 0.5
		}
	});
};
