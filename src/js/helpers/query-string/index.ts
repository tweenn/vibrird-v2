
export default (param: string) => {
	const searchParams = new URLSearchParams(window.location.search);
	return searchParams.get(param);
}
