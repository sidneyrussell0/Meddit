import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchReddit } from '../../app/reddit';

//Thunk for searching Reddit
export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (query, { rejectWithValue }) => {
    try {
        const res = await searchReddit(query);
        return results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        results: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        resetSearchState: (state) => {
            state.results = [];
            state.query = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchPosts.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.results = action.payload;
            })
            .addCase(searchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch search results';
            });
    },
});


export const { setQuery, resetSearchState } = searchSlice.actions;

export default searchSlice.reducer;