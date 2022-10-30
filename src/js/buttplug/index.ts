
export default async () => {
	let vibrirdButtplugClient: any = false;
	let turnAroundFixForNonAsyncFunction: Function = () => {};

	window.vibrirdButtplugClient = await new Promise((resolve) => {
		const Buttplug = window.Buttplug;

		Buttplug.buttplugInit()
			.then(() => {
				console.log('Library loaded');
				if (process.env.NODE_ENV !== 'production') {
					Buttplug.activateConsoleLogger('debug');
				}

				vibrirdButtplugClient = new Buttplug.ButtplugClient('vibrirdClient');
				let connector = new Buttplug.ButtplugEmbeddedConnectorOptions();

				vibrirdButtplugClient.connect(connector);

				vibrirdButtplugClient.addListener('deviceadded', async (device: any) => {
					if (!device.messageAttributes(Buttplug.ButtplugDeviceMessageType.VibrateCmd)) {
						return;
					}

					await device.stop();

					try {
						await device.vibrate(1.0);
					} catch (err) {
						console.log(err);
						if (err instanceof Buttplug.ButtplugDeviceError) {
							console.log('got a device error!');
						}
					}
					await new Promise(r => setTimeout(r, 50));
					await device.stop();

					window.vibrirdToy = device;
					// REALLY DIRTY AND CHEAP TURN AROUND
					turnAroundFixForNonAsyncFunction();
				});
				
				// TODO: Add this code
				vibrirdButtplugClient.addListener("deviceremoved", (device: any) => {
					console.log(`Device Removed: ${device.Name}`)
					window.vibrirdToy = undefined;
					// REALLY DIRTY AND CHEAP TURN AROUND
					turnAroundFixForNonAsyncFunction();
				});

				resolve(vibrirdButtplugClient);
			});
	});

	// HIJACK OLD SCANNING METHOD
	const oldStartScanning = window.vibrirdButtplugClient.startScanning;
	
	window.vibrirdButtplugClient.startScanning = async () => {
		await new Promise((resolve) => {
			oldStartScanning();
			// DO A REALLY CHEAP TURN AROUND
			turnAroundFixForNonAsyncFunction = resolve;
		});
	}
};
