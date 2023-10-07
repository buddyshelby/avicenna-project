import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const changePassword = createAsyncThunk('user/changePassword', async (data, thunkAPI) => {
	try {
		const response = await axios.patch(`http://localhost:5000/users/changePassword/${data.id_user}`, {
			currentPassword: data.currentPassword,
			password: data.password,
			confPassword: data.confPassword,
		});
		return response.data;
	} catch (error) {
		const message = error.response.data.msg;
		return thunkAPI.rejectWithValue(message);
	}
})