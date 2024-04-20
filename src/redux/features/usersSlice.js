import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async () => {
        const response = await axios.get('http://localhost:3000/users');
        return response.data;
    }
);

// Async thunk to fetch a single user by ID
export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (userId) => {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        return response.data;
    }
);

// Async thunk to add a new user
export const addUser = createAsyncThunk(
    'users/addUser',
    async (userData) => {
        const response = await axios.post('http://localhost:3000/auth/singup', userData);
        return response.data;
    }
);
export const fetchUserOrdersWithProducts = createAsyncThunk(
    'users/fetchUserOrdersWithProducts',
    async (userId, { dispatch }) => {
        const userOrders = await fetchUserOrders(userId); // Fetch user orders
        // For each order, fetch product details and update the order object
        await Promise.all(
            userOrders.map(async (order) => {
                const productsWithDetails = await Promise.all(
                    order.products.map(async (productId) => {
                        const product = await dispatch(fetchProductById(productId));
                        return product.payload; // Assuming fetchProductById returns product details
                    })
                );
                order.products = productsWithDetails;
                return order;
            })
        );
        return userOrders;
    }
);

// Async thunk to update a user
export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ userId, updatedUserData }) => {
        const response = await axios.put(`http://localhost:3000/users/${userId}`, updatedUserData);
        return response.data;
    }
);
// Async thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
    'users/fetchUserOrders',
    async (userId) => {
        const response = await axios.get(`http://localhost:3000/orders/${userId}`);
        return response.data;

    }
);

export const fetchUserCard = createAsyncThunk(
    'cards/fetchUserCard',
    async (userId, { getState }) => {
        const token = getState().auth;
        console.log(token)// Get authentication token from the state
        const response = await axios.get(`http://localhost:3000/cards/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response.data;
    }
);

const initialState = {
    users: [],
    card: null,
    userOrders: [],
    loading: false,
    error: null,
    currentUser: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map(user => {
                    if (user.id === action.payload.id) {
                        return action.payload;
                    }
                    return user;
                });
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.userOrders.push(action.payload);
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserCard.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserCard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.card = action.payload;
            })
            .addCase(fetchUserCard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

    }
});

export default userSlice.reducer;
export const userActions = { fetchAllUsers, fetchUser, addUser, updateUser, fetchUserOrders }; // Include fetchUser in userActions
