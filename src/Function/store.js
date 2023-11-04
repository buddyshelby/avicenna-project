import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const initialState = {
	localMessage: '',
	isLogin: false
};

const localReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'isLogin':
		return { ...state, isLogin: !state.isLogin };
		default:
		return state;
	}
};

export const store = configureStore({
	reducer: {
		auth: authReducer,
		storage: localReducer
	}
});

//===================   ACTION   =========================

export const isLogin = {
	type: 'isLogin'
}

