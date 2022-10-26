
export default async () => {
	let unityButtplugClient: any = false;

	return new Promise((resolve) => {
		const Buttplug = window.Buttplug;

		Buttplug.buttplugInit()
			.then(() => {
				console.log('Library loaded');
				if (process.env.NODE_ENV !== 'production') {
					Buttplug.activateConsoleLogger( 'debug');
				}

				unityButtplugClient = new Buttplug.ButtplugClient('unityClient');
				let connector = new Buttplug.ButtplugEmbeddedConnectorOptions();

				unityButtplugClient.connect(connector);

				unityButtplugClient.addListener('deviceadded', async (device: any) => {
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
					await new Promise(r => setTimeout(r, 125));
					await device.stop();
				});

				window.unityButtplugClient = unityButtplugClient;

				resolve('');
			});
	});
};
