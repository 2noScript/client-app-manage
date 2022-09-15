import {createSlice} from '@reduxjs/toolkit';
export const searchKeywordReducer = createSlice({
	name: 'searchKeywordReducer',
	initialState: {
		searchKey: '',
	},
	reducers: {
		setSearchValue: (state, actions) => {
			state.searchKey = actions.payload.searchKey;
		},
		resetSearchValue: state => {
			state.searchKey = '';
		},
	},
	extraReducers: {},
});

export const {setSearchValue, resetSearchValue} = searchKeywordReducer.actions;

export default searchKeywordReducer.reducer;
