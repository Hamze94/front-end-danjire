import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    deposits: null,
    credits: null,
    userTransactions: [],
    loading: false,
    error: null,
}
export const fetchDeposits = createAsyncThunk(
    'transation/fetchDeposits',
    async () => {
        const response = await axios.get('http://localhost:3000/transactions/deposits');
        return response.data
    }
);
export const fetchCredits = createAsyncThunk(
    'transactions/fetchCredits',
    async () => {
        const response = await axios.get('http://localhost:3000/transactions/credits');
        return response.data;
    }
);
export const fetchUserTransactions = createAsyncThunk(
    'transactions/fetchUserTransactions',
    async (userId) => {
        const response = await axios.get(`http://localhost:3000/transactions/user/${userId}`);
        return response.data;
    }
);
export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transactionData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/transactions', transactionData);
            console.log(response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const transactionsSlice = createSlice({
    name: 'transations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeposits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeposits.fulfilled, (state, action) => {
                state.loading = false;
                state.deposits = action.payload;
            })
            .addCase(fetchDeposits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCredits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCredits.fulfilled, (state, action) => {
                state.loading = false;
                state.credits = action.payload;
            })
            .addCase(fetchCredits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.userTransactions = action.payload;
            })
            .addCase(fetchUserTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTransaction.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addTransaction.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });


    }
});
export const transactionActions = { fetchCredits, fetchDeposits, fetchUserTransactions, addTransaction };
export default transactionsSlice.reducer;