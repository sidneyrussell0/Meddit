import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROOT } from '../../app/reddit';

//search
export const searchPosts = createAsyncThunk('search/fetchResults', async (searchTerm, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/search/${encodeURIComponent(searchTerm)}`);
        if (!res.ok) throw new Error('Unable to search post');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        loading: false,
        error: null,
        success: false,
        searchTerm: '',
    },
    reducers: {
        resetSearchState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.searchTerm = '';
            state.results = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchPosts.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.searchTerm = action.meta.arg;
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.results = action.payload;
            })
            .addCase(searchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});


export const { resetSearchState } = searchSlice.actions;

export default searchSlice.reducer;