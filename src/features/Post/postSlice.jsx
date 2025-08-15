import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROOT } from '../../app/reddit';


const post = JSON.parse(localStorage.getItem('post'));  

//createPost
export const createPost = createAsyncThunk('posts/createPost', async (postData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {

        const data = await { API_ROOT }.createPost(postData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to create post');
    }
});

//deletePost
export const deletePost = createAsyncThunk('posts/deletePost', async (postId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {

        const data = await { API_ROOT }.deletePost(postId);
        return postId; //Return the ID so it can be removed from state
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Unable to delete post');
    }
});

//fetchAllPosts
export const fetchAllPosts = createAsyncThunk('posts/fetchAll', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {

        const data = await { API_ROOT }.fetchAllPosts();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Posts not found');
    }
  });

//fetchPost
export const fetchPost = createAsyncThunk('posts/loadPost', async (postId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {

        const data = await { API_ROOT}.fetchPost(postId);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Post not found');
    }
});

//likePost
export const likePost = createAsyncThunk('posts/likePost', async (postId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {

        const data = await { API_ROOT}.likePost(postId);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Unable to like post')
    }
});


const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        searchedPost: post || null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetPostState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.searchedPost = null;
        },
    },
    extraReducers: builder => {
        builder
            //createPost
            .addCase(createPost.pending, state => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);
                state.error = null;
                state.success = true;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //deletePost
            .addCase(deletePost.pending, state => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetchAllPosts
            .addCase(fetchAllPosts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
                state.success = true;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetchPost
            .addCase(fetchPost.pending, state => {
                state.loading = true;
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.loading = false;
                state.searchedPost = action.payload;
                localStorage.setItem('post', JSON.stringify(action.payload));
                state.success = true;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //likePost
            .addCase(likePost.pending, state => {
                state.loading = true;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                //Code below updates the liked post
                const updated = action.payload;
                state.posts = state.posts.map(post => post.id === updated.id ? updated : post);
                if (state.searchedPost?.id === updated.id) {
                    state.searchedPost = updated;
                }
            })
            .addCase(likePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetPostState } = postsSlice.actions;

export default postsSlice.reducer;