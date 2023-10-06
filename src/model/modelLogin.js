import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/LoginUser', async (data, thunkAPI) => {
	try {
		const response = await axios.post('http://localhost:5000/login', {
			username: data.email,
			password: data.password,
		});
		return response.data;
	} catch (error) {
		const message = error.response.data.msg;
		return thunkAPI.rejectWithValue(message);
	}
})