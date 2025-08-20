import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubreddits } from '../../app/reddit';

//Fetch Subreddits
export const fetchSubreddits = createAsyncThunk('submeddits/fetchSubreddits', async (_, thunkAPI) => {
    try {
        const data = await getSubreddits();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  });

const submedditSlice = createSlice({
    name: 'submeddits',
    initialState: {
        subreddits: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetSubmedditState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubreddits.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchSubreddits.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.subreddits = action.payload;
            })
            .addCase(fetchSubreddits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetSubmedditState } = submedditSlice.actions;

export default submedditSlice.reducer;