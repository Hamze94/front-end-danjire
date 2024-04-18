import { createSlice } from '@reduxjs/toolkit';

// Load cart items from local storage if available
const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);
            if (existingItem) {
                existingItem.quantity++; // Increment quantity if item already exists
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update local storage
        },
        removeItem(state, action) {
            const itemId = action.payload;
            state.items = state.items.filter(item => item._id !== itemId);
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        clearCart(state) {
            state.items = [];
            localStorage.removeItem('cartItems'); // Clear local storage
        },
        incrementItem(state, action) {
            const id = action.payload;
            const item = state.items.find(item => item._id === id);
            if (item) {
                item.quantity++;
                localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update local storage
            }
        },
        decrementItem(state, action) {
            const id = action.payload;
            const item = state.items.find(item => item._id === id);
            if (item && item.quantity > 1) {
                item.quantity--;
                localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update local storage
            }
        },
    },
});

export const { addItem, removeItem, clearCart, incrementItem, decrementItem } = cartSlice.actions;

export default cartSlice.reducer;
