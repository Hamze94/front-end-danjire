import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cards: [],
    loading: false,
    error: null,
};

export const fetchCardByUserId = createAsyncThunk(
    'cards/fetchCardByUserId',
    async (userId, thunkAPI) => {
        const { getState } = thunkAPI;
        const { auth } = getState();
        const { token } = auth;
        console.log(auth)

        try {
            const response = await axios.get(`http://localhost:3000/cards/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            return response.data;
        } catch (error) {
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
                state.cards = action.payload;
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
