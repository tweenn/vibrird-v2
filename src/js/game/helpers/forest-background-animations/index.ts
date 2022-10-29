
export default (context: Phaser.Scene) => {
	const animationBaseVelocity = 15000;
	const imageWidth = 928;
	const imageScale = 3.5;

	const bg0009a = context.add.image(0, 0, 'bg0009');
	const bg0009b = context.add.image(0, 0, 'bg0009');
	const bg0008a = context.add.image(0, 0, 'bg0008');
	const bg0008b = context.add.image(0, 0, 'bg0008');
	const bg0007a = context.add.image(0, 0, 'bg0007');
	const bg0007b = context.add.image(0, 0, 'bg0007');
	const bg0006a = context.add.image(0, 0, 'bg0006');
	const bg0006b = context.add.image(0, 0, 'bg0006');
	const bg0005a = context.add.image(0, 0, 'bg0005');
	const bg0005b = context.add.image(0, 0, 'bg0005');
	const bg0004a = context.add.image(0, 0, 'bg0004');
	const bg0004b = context.add.image(0, 0, 'bg0004');
	const bg0003a = context.add.image(0, 0, 'bg0003');
	const bg0003b = context.add.image(0, 0, 'bg0003');
	const bg0002a = context.add.image(0, 0, 'bg0002');
	const bg0002b = context.add.image(0, 0, 'bg0002');
	const bg0001a = context.add.image(0, 0, 'bg0001');
	const bg0001b = context.add.image(0, 0, 'bg0001');
	const bg0000a = context.add.image(0, 0, 'bg0000');
	const bg0000b = context.add.image(0, 0, 'bg0000');

	const backgroundImageryA = [
		bg0000a,
		bg0001a,
		bg0002a,
		bg0003a,
		bg0004a,
		bg0005a,
		bg0006a,
		bg0007a,
		bg0008a,
		bg0009a,
	];

	const backgroundImageryB = [
		bg0000b,
		bg0001b,
		bg0002b,
		bg0003b,
		bg0004b,
		bg0005b,
		bg0006b,
		bg0007b,
		bg0008b,
		bg0009b,
	];

	[
		...backgroundImageryA,
		...backgroundImageryB
	].forEach((imageObject) => {
		imageObject.scale = imageScale;
		imageObject.originX = 0;
		imageObject.displayOriginX = 0;
	});

	backgroundImageryB.forEach((imageObject) => {
		imageObject.displayOriginX = - imageWidth;
	});

	const defaultTween = {
		x: - imageWidth * imageScale,
		ease: 'Linear',
		yoyo: false,
		repeat: -1
	}

	context.tweens.add({
		...defaultTween,
		targets: [
			bg0000a,
			bg0000b
		],
		duration: animationBaseVelocity
	});

	context.tweens.add({
		...defaultTween,
		targets: [
			bg0001a,
			bg0001b,
			bg0002a,
			bg0002b
		],
		duration: animationBaseVelocity + 1000
	});

	context.tweens.add({
		...defaultTween,
		targets: [
			bg0003a,
			bg0003b,
			bg0004a,
			bg0004b,
			bg0005a,
			bg0005b,
		],
		duration: animationBaseVelocity + 3000
	});

	context.tweens.add({
		...defaultTween,
		targets: [
			bg0006a,
			bg0006b,
			bg0007a,
			bg0007b,
		],
		duration: animationBaseVelocity + 7000
	});

	context.tweens.add({
		...defaultTween,
		targets: [
			bg0008a,
			bg0008b,
			bg0009a,
			bg0009b,
		],
		duration: animationBaseVelocity + 12000
	});
};
