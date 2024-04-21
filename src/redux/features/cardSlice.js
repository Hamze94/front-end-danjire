import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cards: [],
    userCard: null,
    loading: false,
    error: null,
};

export const fetchCardByUserId = createAsyncThunk(
    'cards/fetchCardByUserId',
    async (userId, thunkAPI) => {
        const { getState } = thunkAPI;
        const state = getState();
        const token = state.auth.token;
        try {
            const response = await axios.get(`http://localhost:3000/cards/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            // Handle specific error types here (e.g., network errors, etc.)
            console.error('Error fetching cards:', error);
            throw error;
        }
    }
);


export const createCard = createAsyncThunk(
    'cards/createCard',
    async (cardData) => {
        try {
            const response = await axios.post('http://localhost:3000/cards/create', cardData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
);

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCardByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCardByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.userCard = action.payload;
            })
            .addCase(fetchCardByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createCard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCard.fulfilled, (state, action) => {
                state.loading = false;
                state.cards.push(action.payload);
            })
            .addCase(createCard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const cardActions = { fetchCardByUserId, createCard }; // Exporting action creators
export default cardSlice.reducer;
