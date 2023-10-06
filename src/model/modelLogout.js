import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logOutUser = createAsyncThunk('user/logOutUser', async () => {
    const response = await axios.delete('http://localhost:5000/logout');
	return response
});