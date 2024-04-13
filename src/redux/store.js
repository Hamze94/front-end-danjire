import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import salesReducer from './features/salesSlice';
import transnctionReducer from './features/transactionsSlice'

export const store = configureStore({
    reducer: {
        authReducer,
        sales: salesReducer,
        transactions: transnctionReducer
    }
});
