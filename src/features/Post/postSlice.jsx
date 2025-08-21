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
        posts: [
            //Local fake posts, delete when using API
            {
                id: 1,
                title: "My first local post",
                body: "This is just a test post saved locally",
                author: "Sidney R",
                ups: 12,
                num_comments: 3,
            },
            {
                id: 2,
                title: "Second local post",
                body: "Another example post to see on the webpage",
                author: "Jared H",
                ups: 45,
                num_comments: 10,
            },
            //
        ],
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
        builder
            //fetchSubredditPosts
            .addCase(fetchSubredditPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchSubredditPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.posts = action.payload;
            })
            .addCase(fetchSubredditPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //fetchComments
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.searchedPost = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { resetPostState, addLocalPost } = postSlice.actions;

export default postSlice.reducer;