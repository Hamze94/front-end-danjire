import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    user: null,
    token: localStorage.getItem('accessToken') || null, // Retrieve token from localStorage
    loading: false,
    error: null,
    isAuthenticated: false, // Add isAuthenticated field
};

// Define the async thunk for login
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password });
            console.log(response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken'); // Remove token from localStorage on logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.access_token;
                state.isAuthenticated = true;
                localStorage.setItem('accessToken', action.payload.access_token); // Store token in localStorage on successful login
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
            });
    }
});

// Export actions and reducer
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
