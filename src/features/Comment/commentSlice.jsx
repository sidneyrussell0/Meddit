import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROOT } from '../../app/reddit';


const comment = JSON.parse(localStorage.getItem('comment'));

//createComment
export const createComment = createAsyncThunk('comments/createComment', async (commentData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {

        const data = await { API_ROOT }.createComment(commentData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to create comment');
    }
});

//deleteComment
export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {

        const data = await { API_ROOT }.deleteComment(commentId);
        return commentId; //Return the ID so it can be removed from state
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Unable to delete comment');
    }
});

//fetchAllComments
export const fetchAllComments = createAsyncThunk('comments/fetchAll', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {

        const data = await { API_ROOT }.fetchAllComments();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Comments not found');
    }
  });

//fetchComment
export const fetchComment = createAsyncThunk('comments/fetchComment', async (commentId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {

        const data = await { API_ROOT }.fetchComment(commentId);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Comment not found');
    }
});

//likeComment
export const likeComment = createAsyncThunk('comments/likeComment', async (commentId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        const data = await { API_ROOT }.likeComment(commentId);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Unable to like comment')
    }
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        searchedComment: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetCommentState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.searchedComment = null;
        },
    },
    extraReducers: builder => {
        builder
            //createComment
            .addCase(createComment.pending, state => {
                state.loading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload);
                state.error = null;
                state.success = true;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //deleteComment
            .addCase(deleteComment.pending, state => {
                state.loading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetchAllComments
            .addCase(fetchAllComments.pending, state => {
                state.loading = true;
            })
            .addCase(fetchAllComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
                state.success = true;
            })
            .addCase(fetchAllComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetchComment
            .addCase(fetchComment.pending, state => {
                state.loading = true;
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.loading = false;
                state.searchedComment = action.payload;
                localStorage.setItem('comment', JSON.stringify(action.payload));
                state.success = true;
            })
            .addCase(fetchComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //likeComment
            .addCase(likeComment.pending, state => {
                state.loading = true;
            })
            .addCase(likeComment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                //Code below updates the liked comment
                const updated = action.payload;
                state.comments = state.comments.map(comment => comment.id === updated.id ? updated : comment);
                if (state.searchedComment?.id === updated.id) {
                    state.searchedComment = updated;
                }
            })
            .addCase(likeComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetCommentState } = commentsSlice.actions;

export default commentsSlice.reducer;