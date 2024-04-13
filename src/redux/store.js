import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import salesReducer from './features/salesSlice';

export const store = configureStore({
    reducer: {
        authReducer,
        sales: salesReducer,
    }
});
