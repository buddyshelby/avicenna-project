import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addUser = createAsyncThunk('user/addUser', async (data, thunkAPI) => {
	try {
		const response = await axios.post('http://localhost:5000/users', {
			id_role: data.id_role,
			username: data.username,
			password: data.password,
			confPassword: data.confPassword,
			name: data.name,
			fullname: data.fullname,
			email: data.email,
			alamat: data.alamat,
			no_hp: data.no_hp,
			jabatan: data.jabatan
		});
		return response.data;
	} catch (error) {
		const message = error.response.data.msg;
		return thunkAPI.rejectWithValue(message);
	}
})