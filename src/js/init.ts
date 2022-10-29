import security from './security';
import hasBlueetoth from './has-blueetoth';
import buttplug from './buttplug';
import game from './game';

export default async () => {
	await security();
	await buttplug();
	await hasBlueetoth();

	game();

	// window.clicked = false;
	// document.body.onclick = () => {
	// 	if (!window.clicked) {
	// 		window.clicked = true;
	// 		window.unityButtplugClient.startScanning();
	// 	}
	// }
}
