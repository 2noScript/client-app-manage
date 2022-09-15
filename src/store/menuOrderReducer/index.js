import {createSlice} from '@reduxjs/toolkit';

export const menuOrderReducer = createSlice({
	name: 'menuOrderReducer',
	initialState: {
		items: [
			{
				id: '09',
				name: 'test',
				amount: '2',
				totalPrice: '',
			},
		],
	},
	reducers: {
		resetListOrder: state => {
			state.items = [];
		},
		addListOrder: (state, actions) => {
			state.items = [...state.data, actions.payload.listOrder];
		},
	},
	extraReducers: {},
});
export const {resetListOrder, addListOrder} = menuOrderReducer.actions;

export default menuOrderReducer.reducer;
