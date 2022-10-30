
export const get = (itemKey = '') => {
	const sessionItem: null | string = window.sessionStorage.getItem(itemKey);
	return sessionItem;
};

export const set = (itemKey = '', itemValue = '') => {
	window.sessionStorage.setItem(itemKey, itemValue);
};
