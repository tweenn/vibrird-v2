
import addButton from "../helpers/add-button";

export default (context: Phaser.Scene) => {
	let button = Phaser.GameObjects.Graphics;

	const buildButton = () => {
		button = addButton(context, {
			buttonEnabled: window.hasBluetooth,
			title: {
				text: !window?.vibrirdToy ? 'CONNECT\nBLUETOOTH' : `CONNECTED TO:\n${window.vibrirdToy?._name}`,
				fontSize: '28px'
			}
		}).button;

		if (window.hasBluetooth) {
			button.on('pointerdown', async () => {
				await window.vibrirdButtplugClient.startScanning();
				
				// // TODO STILL A TBD
				await new Promise(r => setTimeout(r, 2000));
				window.vibrirdToy.vibrate(0.2);
				await new Promise(r => setTimeout(r, 1000));
				await window.vibrirdToy.stop();
				
				button.destroy();
				buildButton();
			});
		}
	};

	buildButton();
}
