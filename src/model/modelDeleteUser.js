import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteUser = createAsyncThunk('user/deleteUser', async (id_user, thunkAPI) => {
	try {
		const response = await axios.delete(`http://localhost:5000/users/${id_user}`);
		return response.data;
	} catch (error) {
		const message = error.response.data.msg;
		return thunkAPI.rejectWithValue(message);
	}
})