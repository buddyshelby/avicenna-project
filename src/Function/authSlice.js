import { createSlice } from '@reduxjs/toolkit';
import { getDataUser, getAllDataUser } from '../model/modelDataUser'
import { loginUser } from '../model/modelLogin'
import { logOutUser } from '../model/modelLogout'
import { addUser } from '../model/modelAddUser'
import { changePassword, resetPassword } from '../model/modelPassword'
import { initialState } from './initialState';

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetLogout: state => initialState,
		reset: state => ({
			...initialState,
			userLogOutUser: state.userLogOutUser,
			userResetPassword: state.userResetPassword,
			userChangePassword: state.userChangePassword,
			userGetAllDataUser: state.userGetAllDataUser,
			userGetDataUser: state.userGetDataUser,
			userAddUser: state.userAddUser,
			userLoginUser: state.userLoginUser,
		}),
	},
	extraReducers: builder => {

		// Login

		builder.addCase(loginUser.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccessLoginUser = true;
			state.userLoginUser = action.payload;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isErrorLoginUser = true;
			state.messageLoginUser = action.payload;
		});

		// Add User

		builder.addCase(addUser.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(addUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccessAddUser = true;
		});
		builder.addCase(addUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isErrorAddUser = true;
			state.messageAddUser = action.payload;
		});

		// Get Data User

		builder.addCase(getDataUser.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getDataUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccessGetDataUser = true;
			state.userGetDataUser = action.payload;
		});
		builder.addCase(getDataUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isErrorGetDataUser = true;
			state.messageGetDataUser = action.payload;
		});

		// Get All Data User

		builder.addCase(getAllDataUser.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getAllDataUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccessGetAllDataUser = true;
			state.userGetAllDataUser = action.payload;
		});
		builder.addCase(getAllDataUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isErrorGetAllDataUser = true;
			state.messageGetAllDataUser = action.payload;
		});
		
		// Change Password

		builder.addCase(changePassword.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(changePassword.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccessChangePassword = true;
			state.userChangePassword = action.payload;
		});
		builder.addCase(changePassword.rejected, (state, action) => {
			state.isLoading = false;
			state.isErrorChangePassword = true;
			state.messageChangePassword = action.payload;
		});

		// Reset Password

		builder.addCase(resetPassword.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(resetPassword.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccessResetPassword = true;
			state.userResetPassword = action.payload;
		});
		builder.addCase(resetPassword.rejected, (state, action) => {
			state.isLoading = false;
			state.isErrorResetPassword = true;
			state.messageResetPassword = action.payload;
		});

		// Logout

		builder.addCase(logOutUser.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(logOutUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccessLogOutUser = true;
			state.userLogOutUser = action.payload;
		});
		builder.addCase(logOutUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isErrorLogOutUser = true;
			state.messageLogOutUser = action.payload;
		});
	},
});

export const { reset, resetLogout } = authSlice.actions;
export default authSlice.reducer;