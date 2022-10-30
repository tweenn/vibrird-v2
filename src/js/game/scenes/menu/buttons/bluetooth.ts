
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
		button.on('pointerdown', async () => {
			await window.vibrirdButtplugClient.startScanning();
			
			// TODO STILL A TBD
			await new Promise(r => setTimeout(r, 2000));
			window.vibrirdToy.vibrate(2.0);
			await new Promise(r => setTimeout(r, 1000));
			await window.vibrirdToy.stop();
		});
	}
}
