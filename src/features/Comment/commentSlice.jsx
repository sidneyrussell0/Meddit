//Check Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROOT } from '../../app/reddit';

//createComment
export const createComment = createAsyncThunk('comments/createComment', async (commentData, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData),
        });
        if (!res.ok) throw new Error('Failed to create comment')
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//deleteComment
export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/comments/${commentId}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Unable to delete comment');
        return commentId; //Return the ID so it can be removed from state
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//fetchAllComments
export const fetchAllComments = createAsyncThunk('comments/fetchAll', async (_, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/comments`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  });

//fetchComment
export const fetchComment = createAsyncThunk('comments/fetchComment', async (commentId, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/comments/${commentId}`);
        if (!res.ok) throw new Error('Comment not found');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//likeComment
export const likeComment = createAsyncThunk('comments/likeComment', async (commentId, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/comments/${commentId}/like`, {
            method: 'POST',
        });
        if (!res.ok) throw new Error('Unable to like comment');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const commentSlice = createSlice({
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
            //createComment
            .addCase(createComment.pending, setPending)
            .addCase(createComment.fulfilled, (state, action) => {
                loading = false;
                success = true;
                state.comments.push(action.payload);
            })
            .addCase(createComment.rejected, setRejected)

            //deleteComment
            .addCase(deleteComment.pending, setPending)
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            })
            .addCase(deleteComment.rejected, setRejected)

            //fetchAllComments
            .addCase(fetchAllComments.pending, setPending)
            .addCase(fetchAllComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
                state.success = true;
            })
            .addCase(fetchAllComments.rejected, setRejected)

            //fetchComment
            .addCase(fetchComment.pending, setPending)
            .addCase(fetchComment.fulfilled, (state, action) => {
                loading = false;
                success = true;
                state.searchedComment = action.payload;
            })
            .addCase(fetchComment.rejected, setRejected)

            //likeComment
            .addCase(likeComment.pending, setPending)
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
            .addCase(likeComment.rejected, setRejected);
    },
});

export const { resetCommentState } = commentSlice.actions;

export default commentSlice.reducer;