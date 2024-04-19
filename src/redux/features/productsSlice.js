import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { removeItem } from "./cartSlice";

const initialState = {
    products: [],
    loading: true,
    error: null,
    searchQuery: '',
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
);
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ productId, updatedProduct }, { rejectWithValue }) => {
        try {
            console.log(productId, updatedProduct)
            const formData = new FormData();
            formData.append('name', updatedProduct.name);
            formData.append('category', updatedProduct.category);
            formData.append('sellingPrice', updatedProduct.sellingPrice);
            formData.append('costPrice', updatedProduct.costPrice);
            formData.append('expireyDate', updatedProduct.expireyDate);
            formData.append('description', updatedProduct.description);
            formData.append('image', updatedProduct.image[0]); // Assuming updatedProduct.image is an array containing the uploaded file
            const response = await axios.put(`http://localhost:3000/products/${productId}/update`, formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:3000/products/${productId}/delete`);
            if (response && response.data) {
                return response.data;
            } else {
                throw new Error('Failed to delete product');
            }
        } catch (error) {
            console.error(error); // Add this line for additional debugging
            return rejectWithValue(error.response?.data);
        }
    }
)
export const selectFilteredProducts = state => {
    const searchQuery = state.products.searchQuery.toLowerCase();
    return state.products.products.filter(product =>
        product.name.toLowerCase().includes(searchQuery)
    );
};
export const setSearchQuery = (searchQuery) => ({
    type: 'products/setSearchQuery',
    payload: searchQuery,
});
export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (productId, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:3000/products/${productId}`);
            return response.data; // Return the fetched product details
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true; // Corrected casing here
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload); // Append the new product to the existing array
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false; // Corrected casing here
                state.error = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true; // Corrected casing here
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                const deletedProductId = action.payload._id;
                state.products = state.products.filter(product => product._id !== deletedProductId);
                removeItem(deletedProductId);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false; // Corrected casing here
                state.error = action.error.message;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true; // Corrected casing here
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map(product => {
                    if (product._id === action.payload._id) {
                        return action.payload;
                    }
                    return product;
                });
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to update product';
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
            })
            // Handle success state after fetching product details
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                // Add the fetched product to the state
                state.products.push(action.payload);
            })
            // Handle error state if fetching product details fails
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set the error message
            });
    }
});

export const productsActions = { fetchProducts, fetchProductById, addProduct, deleteProduct, updateProduct, setSearchQuery }
export default productsSlice.reducer;