import {createSlice} from '@reduxjs/toolkit';
import {data} from 'autoprefixer';

export const userReducer = createSlice({
	name: 'userReducer',
	initialState: {
		data: null,
		user: null,
	},
	reducers: {
		isAdmin: (state, actions) => {
			state.user = 'admin';
			state.data = actions.payload;
		},
		isClient: (state, actions) => {
			// const {id} = actions.payload;
			state.user = 'client';
			// state.id = id;
		},
		resetUser: state => {
			state.user = null;
		},
	},
});
export const {resetUser, isClient, isAdmin} = userReducer.actions;

export default userReducer.reducer;
