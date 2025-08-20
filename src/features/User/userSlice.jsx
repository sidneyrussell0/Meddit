//WORKING ON SLICE TO VIEW REDDIT USERNAMES AND THEIR POSTS
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Fetch Reddit User
export const fetchUserPosts = createAsyncThunk('user/fetchUserPosts', async (username, thunkAPI) => {
    try {
        const res = await fetch(`https://www.reddit.com/user/${username}/submitted.json`);
        if (!res.ok) throw new Error('Unable to fetch user posts');
        const json = await res.json();
        return json.data.children.map(post => post.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        posts: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetUserState: (state) => {
            state.posts = [];
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: builder => {
        const setPending = (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        };
        const setRejected = (state, action) => {
            state.loading = false;
            state.error = action.payload;
        };

        builder
            //fetchProfile
            .addCase(fetchUserPosts.pending, setPending)
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserPosts.rejected, setRejected)
    },
});


export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;