import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    deposits: null,
    credits: null,
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


    }
});
export const transactionActions = { fetchCredits, fetchDeposits };
export default transactionsSlice.reducer;