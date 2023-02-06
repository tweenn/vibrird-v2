
import queryString from '../../../helpers/query-string'

export default () => {
	return queryString('godmode') === 'true';
};
