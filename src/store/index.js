import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './productsReducer';
import userReducer from './userReducer';
import searchKeywordReducer from './searchKeywordReducer';
import menuOrderReducer from './menuOrderReducer';
export default configureStore({
	reducer: {
		productsReducer,
		userReducer,
		searchKeywordReducer,
		menuOrderReducer,
	},
});
