import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import salesReducer from './features/salesSlice';
import transnctionReducer from './features/transactionsSlice'
import productsReducer from './features/productsSlice'
import categoriesReducer from "./features/categoriesSlice";
import itemesReducer from './features/cartSlice'
import usersReducer from './features/usersSlice'
import cardReducer from './features/cardSlice'
import darkModeSlice from './features/darkModeSlice/'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        sales: salesReducer,
        transactions: transnctionReducer,
        products: productsReducer,
        categories: categoriesReducer,
        items: itemesReducer,
        users: usersReducer,
        cards: cardReducer,
        darkMode: darkModeSlice
    }
});
