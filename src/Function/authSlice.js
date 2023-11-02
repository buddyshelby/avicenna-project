import { createSlice } from '@reduxjs/toolkit';
import { getDataUser } from '../model/modelDataUser'
import { loginUser } from '../model/modelLogin'
import { logOutUser } from '../model/modelLogout'
import { addUser } from '../model/modelAddUser'
import { changePassword, resetPassword } from '../model/modelPassword'

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
			state.isLoadingLoginUser = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
<<<<<<< HEAD
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action.payload;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
=======
			state.isLoadingLoginUser = false;
			state.isSuccessLoginUser = true;
			state.userLoginUser = action.payload;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.isLoadingLoginUser = false;
			state.isErrorLoginUser = true;
			state.messageLoginUser = action.payload;
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)
		});

		// Login

		builder.addCase(addUser.pending, state => {
			state.isLoadingAddUser = true;
		});
		builder.addCase(addUser.fulfilled, (state, action) => {
<<<<<<< HEAD
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action.payload;
		});
		builder.addCase(addUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
=======
			state.isLoadingAddUser = false;
			state.isSuccessAddUser = true;
		});
		builder.addCase(addUser.rejected, (state, action) => {
			state.isLoadingAddUser = false;
			state.isErrorAddUser = true;
			state.messageAddUser = action.payload;
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)
		});

		// Get User Login

		builder.addCase(getDataUser.pending, state => {
			state.isLoadingGetDataUser = true;
		});
		builder.addCase(getDataUser.fulfilled, (state, action) => {
<<<<<<< HEAD
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action.payload;
		});
		builder.addCase(getDataUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
=======
			state.isLoadingGetDataUser = false;
			state.isSuccessGetDataUser = true;
			state.userGetDataUser = action.payload;
		});
		builder.addCase(getDataUser.rejected, (state, action) => {
			state.isLoadingGetDataUser = false;
			state.isErrorGetDataUser = true;
			state.messageGetDataUser = action.payload;
		});

		// Get All Data User

		builder.addCase(getAllDataUser.pending, state => {
			state.isLoadingGetAllDataUser = true;
		});
		builder.addCase(getAllDataUser.fulfilled, (state, action) => {
			state.isLoadingGetAllDataUser = false;
			state.isSuccessGetAllDataUser = true;
			state.userGetAllDataUser = action.payload;
		});
		builder.addCase(getAllDataUser.rejected, (state, action) => {
			state.isLoadingGetAllDataUser = false;
			state.isErrorGetAllDataUser = true;
			state.messageGetAllDataUser = action.payload;
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)
		});
		
		// Change Password

		builder.addCase(changePassword.pending, state => {
			state.isLoadingChangePassword = true;
		});
		builder.addCase(changePassword.fulfilled, (state, action) => {
<<<<<<< HEAD
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action.payload;
		});
		builder.addCase(changePassword.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
=======
			state.isLoadingChangePassword = false;
			state.isSuccessChangePassword = true;
			state.userChangePassword = action.payload;
		});
		builder.addCase(changePassword.rejected, (state, action) => {
			state.isLoadingChangePassword = false;
			state.isErrorChangePassword = true;
			state.messageChangePassword = action.payload;
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)
		});

		// Reset Password

		builder.addCase(resetPassword.pending, state => {
			state.isLoadingResetPassword = true;
		});
		builder.addCase(resetPassword.fulfilled, (state, action) => {
<<<<<<< HEAD
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action.payload;
		});
		builder.addCase(resetPassword.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
=======
			state.isLoadingResetPassword = false;
			state.isSuccessResetPassword = true;
			state.userResetPassword = action.payload;
		});
		builder.addCase(resetPassword.rejected, (state, action) => {
			state.isLoadingResetPassword = false;
			state.isErrorResetPassword = true;
			state.messageResetPassword = action.payload;
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)
		});

		// Logout

		builder.addCase(logOutUser.pending, state => {
			state.isLoadingLogOutUser = true;
		});
		builder.addCase(logOutUser.fulfilled, (state, action) => {
<<<<<<< HEAD
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action;
		});
		builder.addCase(logOutUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action;
=======
			state.isLoadingLogOutUser = false;
			state.isSuccessLogOutUser = true;
			state.userLogOutUser = action.payload;
		});
		builder.addCase(logOutUser.rejected, (state, action) => {
			state.isLoadingLogOutUser = false;
			state.isErrorLogOutUser = true;
			state.messageLogOutUser = action.payload;
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)
		});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;