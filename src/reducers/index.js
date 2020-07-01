import { combineReducers } from 'redux';
import user from './user';
import feed from './feed';

export default combineReducers({
	user,
	feed,
})
