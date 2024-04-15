import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    categories: [],
    loading: false,
    error: null,
}
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategores',
    async () => {
        const response = await axios.get('http://localhost:3000/categories');
        return response.data
    }
);
export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/categories/create', categoryData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ categoryId, updatedCategory }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3000/categories/${categoryId}`, updatedCategory);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const categoreisSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to add category';
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.map(category => {
                    if (category._id === action.payload._id) {
                        return action.payload;
                    }
                    return category;
                });
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to update category';
            });
    }
});

export const categoreyActions = { fetchCategories, addCategory, updateCategory };
export default categoreisSlice.reducer