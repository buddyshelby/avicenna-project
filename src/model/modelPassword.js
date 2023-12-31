import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const changePassword = createAsyncThunk('user/changePassword', async (data, thunkAPI) => {
	try {
		const response = await axios.patch(`http://localhost:5000/users/changePassword/${data.id_user}`, {
			currentPassword: data['current_password'],
			password: data.password,
			confPassword: data['confirm_password'],
		});
		return response.data;
	} catch (error) {
		const message = error.response.data.msg;
		return thunkAPI.rejectWithValue(message);
	}
})

export const resetPassword = createAsyncThunk('user/resetPassword', async (data, thunkAPI) => {
	try {
		const response = await axios.post(`http://localhost:5000/users/verify`, {
			email: data.email
		});
		return response.data;
	} catch (error) {
		const message = error.response.data.msg;
		return thunkAPI.rejectWithValue(message);
	}
})

export const resetedPassword = createAsyncThunk('user/resetedPassword', async (data, thunkAPI) => {
	try {
	const response = await axios.post(`http://localhost:5000/users/resetPassword/`, {
		uniq_id: data.uniq_id
	});
	return response.data;
	} catch (error) {
		const message = error.response.data.msg;
		return thunkAPI.rejectWithValue(message);
	}
})