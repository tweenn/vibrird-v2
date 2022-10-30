
export default async () => {
	window.hasBluetooth = await navigator.bluetooth.getAvailability();
}
