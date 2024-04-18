import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import salesReducer from './features/salesSlice';
import transnctionReducer from './features/transactionsSlice'
import productsReducer from './features/productsSlice'
import categoriesReducer from "./features/categoriesSlice";
import itemesReducer from './features/cartSlice'
import usersReducer from './features/usersSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        sales: salesReducer,
        transactions: transnctionReducer,
        products: productsReducer,
        categoreis: categoriesReducer,
        items: itemesReducer,
        users: usersReducer
    }
});
