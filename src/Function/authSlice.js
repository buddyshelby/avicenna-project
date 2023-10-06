import { createSlice } from '@reduxjs/toolkit';
import { getDataUser } from '../model/modelDataUser'
import { loginUser } from '../model/modelLogin'
import { logOutUser } from '../model/modelLogout'
import { addUser } from '../model/modelAddUser'

const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: state => initialState,
	},
	extraReducers: builder => {

		// Login

		builder.addCase(loginUser.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action.payload;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
		});

		// Login

		builder.addCase(addUser.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(addUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action.payload;
		});
		builder.addCase(addUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
		});

		// Get User Login

		builder.addCase(getDataUser.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getDataUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action.payload;
		});
		builder.addCase(getDataUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
		});

		// Logout

		builder.addCase(logOutUser.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(logOutUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action;
		});
		builder.addCase(logOutUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action;
		});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;