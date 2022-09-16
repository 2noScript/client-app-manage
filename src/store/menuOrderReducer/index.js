import {createSlice} from '@reduxjs/toolkit';
import {actions} from 'react-table';

export const menuOrderReducer = createSlice({
	name: 'menuOrderReducer',
	initialState: {
		items: [
			// {
			// 	id: '09',
			// 	name: 'test',
			// 	amount: '2',
			// 	totalPrice: '121',
			// },
		],
	},
	reducers: {
		resetListOrder: state => {
			state.items = [];
		},
		addListOrder: (state, actions) => {
			state.items = [...state.items, actions.payload];
		},

		deleteItemOfListOrder: (state, actions) => {
			const newItems = state.items.filter(item => item.id !== actions.payload.id);
			state.items = newItems;
		},
	},
	extraReducers: {},
});
export const {resetListOrder, addListOrder, deleteItemOfListOrder} =
	menuOrderReducer.actions;

export default menuOrderReducer.reducer;
