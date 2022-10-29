
export default async () => {
	window.hasBluetooth = await navigator.bluetooth.getAvailability()
	if (!window.hasBluetooth) {
		console.log('Ferrou mermão!');
	}
}
