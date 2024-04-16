import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import salesReducer from './features/salesSlice';
import transnctionReducer from './features/transactionsSlice'
import productsReducer from './features/productsSlice'
import categoriesReducer from "./features/categoriesSlice";
import itemesReducer from './features/cartSlice'
export const store = configureStore({
    reducer: {
        authReducer,
        sales: salesReducer,
        transactions: transnctionReducer,
        products: productsReducer,
        categoreis: categoriesReducer,
        items: itemesReducer
    }
});
