import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const editUser = createAsyncThunk('user/editUser', async (data, thunkAPI) => {
	try {
		const response = await axios.patch(`http://localhost:5000/users/${data.id_user}`, data.update);
		return response.data;
	} catch (error) {
		const message = error.response.data.msg;
		return thunkAPI.rejectWithValue(message);
	}
})