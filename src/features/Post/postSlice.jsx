//Check Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROOT } from '../../app/reddit';

//createPost
export const createPost = createAsyncThunk('post/createPost', async (postData, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/post`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        if (!res.ok) throw new Error('Unable to create post');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//deletePost
export const deletePost = createAsyncThunk('post/deletePost', async (postId, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/post/${postId}`, {
            method:'DELETE',
        });
        if (!res.ok) throw new Error('Unable to delete post');
        return postId; //Return the ID so it can be removed from state
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//fetchAllPosts
export const fetchAllPosts = createAsyncThunk('post/fetchAll', async (_, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/post`);
        if (!res.ok) throw new Error('Unable to fetch posts');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  });

//fetchPost
export const fetchPost = createAsyncThunk('post/loadPost', async (postId, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/post/${postId}`);
        if (!res.ok) throw new Error('Post not found')
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//likePost
export const likePost = createAsyncThunk('post/likePost', async (postId, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/post/${postId}/like`, {
            method: 'POST',
        });
        if (!res.ok) throw new Error('Unable to like post');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        searchedPost: null,
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
            //createPost
            .addCase(createPost.pending, setPending)
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, setRejected)

            //deletePost
            .addCase(deletePost.pending, setPending)
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
            .addCase(deletePost.rejected, setRejected)

            //fetchAllPosts
            .addCase(fetchAllPosts.pending, setPending)
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.posts = action.payload;
            })
            .addCase(fetchAllPosts.rejected, setRejected)

            //fetchPost
            .addCase(fetchPost.pending, setPending)
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.searchedPost = action.payload;
            })
            .addCase(fetchPost.rejected, setRejected)

            //likePost
            .addCase(likePost.pending, setPending)
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
            .addCase(likePost.rejected, setRejected);
    },
});

export const { resetPostState } = postSlice.actions;

export default postSlice.reducer;