import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    sales: [],
    salesPerMonth: null, // Initialize salesPerMonth as null
    loading: false,
    error: null,
};

export const fetchSales = createAsyncThunk(
    'sales/fetchSales',
    async () => {
        const response = await axios.get('http://localhost:3000/orders');
        return response.data;
    }
);
export const fetchSalesPerMonth = createAsyncThunk(
    'sales/fetchSales/perMonth',
    async () => {
        const response = await axios.get('http://localhost:3000/orders/revenue/month');
        return response.data;
    }
);

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSales.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSales.fulfilled, (state, action) => {
                state.loading = false;
                state.sales = action.payload;
            })
            .addCase(fetchSales.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSalesPerMonth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSalesPerMonth.fulfilled, (state, action) => {
                state.loading = false;
                state.salesPerMonth = action.payload;
            })
            .addCase(fetchSalesPerMonth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const salesActions = { fetchSales, fetchSalesPerMonth }; // Exporting action creators
export default salesSlice.reducer;
