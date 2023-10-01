import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const requestAPI = createAsyncThunk('user/requestAPI', async (data, thunkAPI) => {
    
    if (typeof data !== 'object') {
        console.log('Please input parameter Data correctly.')
        return 0;
    }

    if (data.method === 'post') {
        try {
            const response = await axios.post(data.apiUrl, {
                username: 'admin',
                password: '123',
            });

            // const response2 = await axios.get('http://localhost:5000/me');

            console.log(response);

            return response.data;
        } catch (error) {
			if (error.response) {
				const message = error.response.data.msg;
				return thunkAPI.rejectWithValue(message);
			}
		}
    } else if (data.method === 'get') {
        try {
            const response = await axios.get(data.apiUrl);
            return response.data;
        } catch (error) {
			if (error.response) {
				const message = error.response.data.msg;
				return thunkAPI.rejectWithValue(message);
			}
		}
    }
})

export const LogOut = createAsyncThunk('user/LogOut', async () => {
	await axios.delete('http://localhost:5000/logout');
	
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: state => initialState,
	},
	extraReducers: builder => {
		builder.addCase(requestAPI.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(requestAPI.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action.payload;
		});
		builder.addCase(requestAPI.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
		});

		// Get User Login

		// builder.addCase(getMe.pending, state => {
		// 	state.isLoading = true;
		// });
		// builder.addCase(getMe.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.user = action.payload;
		// });
		// builder.addCase(getMe.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isError = true;
		// 	state.message = action.payload;
		// });
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;