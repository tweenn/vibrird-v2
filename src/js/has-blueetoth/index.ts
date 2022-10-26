
export default async () => {
	const hasBlueetoth = await navigator.bluetooth.getAvailability()
	if (!hasBlueetoth) {
		console.log('Ferrou mermão!');
	}

	return hasBlueetoth;
}
