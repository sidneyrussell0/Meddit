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
        subreddits: [
            //Local fake subreddits, delete when using API
            {
                id: 'local1',
                display_name: 'Test One',
                display_name_prefixed: 'r/1Subreddit',
                title: 'First Subreddit',
                icon_img: '/Images/default.png',
            },
            {
                id: 'local2',
                display_name: 'Test Two',
                display_name_prefixed: 'r/2Subreddit',
                title: 'Second Subreddit',
                icon_img: '/Images/default.png',
            },
            {
                id: 'local3',
                display_name: 'Test Three',
                display_name_prefixed: 'r/3Subreddit',
                title: 'Third Subreddit',
                icon_img: '/Images/default.png',
            },
            {
                id: 'local4',
                display_name: 'Test Four',
                display_name_prefixed: 'r/4Subreddit',
                title: 'Fourth Subreddit',
                icon_img: '/Images/default.png',
            },
            //
        ],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        addLocalSubreddit: (state, action) => {
            state.subreddits.push(action.payload);
        },
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
                state.subreddits = [...state.subreddits, ...action.payload];
            })
            .addCase(fetchSubreddits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetSubmedditState, addLocalSubreddit } = submedditSlice.actions;

export default submedditSlice.reducer;