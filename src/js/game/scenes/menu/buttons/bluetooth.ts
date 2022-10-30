
import addButton from "../add-button";

export default (context: Phaser.Scene) => {
	const button = addButton(context, {
		buttonEnabled: window.hasBluetooth,
		title: {
			text: 'CONNECT\nBLUETOOTH',
			fontSize: '28px'
		}
	}).button;

	if (window.hasBluetooth) {
		button.on('pointerdown', () => {
			window.unityButtplugClient.startScanning();
		});
	}
}
