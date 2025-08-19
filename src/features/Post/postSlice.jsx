import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubredditPosts, getPostComments } from '../../app/reddit';

//fetch posts from a subreddit
export const fetchSubredditPosts = createAsyncThunk('post/fetchSubredditPosts', async (subreddit, thunkAPI) => {
    try {
        const posts = await getSubredditPosts(subreddit);
        return posts;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//fetch comments for a specific post
export const fetchComments = createAsyncThunk('post/fetchComments', async (permalink, thunkAPI) => {
    try {
        const comments = await getPostComments(permalink);
        return comments;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  });

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        comments: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        addLocalPost: (state, action) => {
            state.posts.push(action.payload);
        },
        resetPostState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.posts = [];
            state.comments = [];
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
            //fetchSubredditPosts
            .addCase(fetchSubredditPosts.pending, setPending)
            .addCase(fetchSubredditPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.posts = action.payload;
            })
            .addCase(fetchSubredditPosts.rejected, setRejected)

            //fetchComments
            .addCase(fetchComments.pending, setPending)
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.searchedPost = action.payload;
            })
            .addCase(fetchComments.rejected, setRejected)
    },
});

export const { resetPostState, addLocalPost } = postSlice.actions;

export default postSlice.reducer;