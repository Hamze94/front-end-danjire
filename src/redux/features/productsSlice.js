import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products: [],
    Loading: false,
    error: null,
};
export const addProduct = createAsyncThunk(
    'products/addProduct',
    async ({ productData }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('category', productData.category);
            formData.append('sellingPrice', productData.sellingPrice);
            formData.append('costPrice', productData.costPrice);
            formData.append('expireyDate', productData.expireyDate);
            formData.append('description', productData.description);
            formData.append('image', productData.image[0]); // Assuming productData.image is an array containing the uploaded file
            const response = await axios.post('http://localhost:3000/products/create', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('http://localhost:3000/products');
        return response.data;
    }
)
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId, { rejectWithValue }) => {
        try {
            console.log(productId)
            const response = await axios.delete(`http://localhost:3000/products/${productId}/delete`);
            console.log(response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.Loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.Loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.Loading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product._id !== action.payload._id);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
});

export const productsActions = { fetchProducts, addProduct, deleteProduct }
export default productsSlice.reducer;