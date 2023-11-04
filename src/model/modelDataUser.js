import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDataUser = createAsyncThunk('user/getDataUser', async (_, thunkAPI) => {
	try {
		const response = await axios.get('http://localhost:5000/me').then(res => res).catch(err => err)
		return response.data
	} catch (error) {
		if (error.response) {
			const message = error.response.data.msg;
			return thunkAPI.rejectWithValue(message);
		}
	}
});

export const getAllDataUser = createAsyncThunk('user/getAllDataUser', async (_, thunkAPI) => {
	try {
		const response = await axios.get('http://localhost:5000/users')
		return response.data
	} catch (error) {
		if (error.response) {
			const message = error.response.data.msg;
			return thunkAPI.rejectWithValue(message);
		}
	}
});