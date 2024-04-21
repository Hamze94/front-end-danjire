import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
    darkMode: localStorage.getItem('darkMode') === 'true' || false,
};

// Create the dark mode slice
const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', state.darkMode); // Store dark mode preference in localStorage
        },
        setDarkMode(state, action) {
            state.darkMode = action.payload;
            localStorage.setItem('darkMode', action.payload); // Store dark mode preference in localStorage
        },
    },
});

// Export actions and reducer
export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
