import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api';

export const fetchProductsList = createAsyncThunk(
	'fetchProductsList',
	async (params, thunkAPI) => {
		try {
			const {data} = await api.get(`products`, {
				params: {
					...params,
					token: 'abcd',
				},
			});
			return data;
		} catch {
			return null;
		}
	}
);

export const productsReducer = createSlice({
	name: 'productsReducer',
	initialState: {
		error: false,
		data: null,
		loading: false,
	},
	reducers: {
		resetData: state => {
			state.data = null;
		},
	},
	extraReducers: {
		[fetchProductsList.pending]: state => {
			state.loading = true;
		},
		[fetchProductsList.rejected]: state => {
			state.error = true;
		},
		[fetchProductsList.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.loading = false;
		},
	},
});
export const {resetData} = productsReducer.actions;

export default productsReducer.reducer;
