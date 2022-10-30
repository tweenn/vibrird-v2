import forceHttps from './helpers/force-https';
import {
	check as ageConsentCheck
} from './helpers/age-consent';
import hasBlueetoth from './helpers/has-blueetoth';
import buttplug from './buttplug';
import game from './game';

export default async () => {
	await forceHttps();
	await buttplug();
	ageConsentCheck();
	await hasBlueetoth();

	game();
}
