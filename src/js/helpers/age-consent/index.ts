
import {
	get as sessionGet,
	set as sessionSet
} from '../session-storage';

export const check = () => {
	window.ageConsent = sessionGet('age-consent') === 'true';
};

export const confirm = () => {
	sessionSet('age-consent', 'true');
	window.ageConsent = true;
};
