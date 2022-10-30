
export default async () => {
	return new Promise((resolve) => {
		if ((document.location.hostname !== 'localhost') && (document.location.protocol !== 'https:')) {
			document.location.protocol = 'https:';
		} else {
			resolve('');
		}
	});
}
