import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//search
export const searchPosts = createAsyncThunk('search/fetchResults', async (searchTerm, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        dispatch(setGlobalLoading(true));

        const response = await fetch(
            `http://localhost:5000/api/search?q=${encodeURIComponent(searchTerm)}`,
            { credentials: 'include', } //send cookies for auth
        );

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    } finally {
        dispatch(setGlobalLoading(false));
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        loading: false,
        error: null,
        searchTerm: '',
    },
    reducers: {
        resetSearchState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchPosts.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(searchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export const { resetSearchState } = searchSlice.actions;

export default searchSlice.reducer;