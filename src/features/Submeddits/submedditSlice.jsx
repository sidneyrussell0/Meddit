import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROOT } from '../../app/reddit';
import { setGlobalLoading } from '../../shared/uiSlice';

const submeddit = JSON.parse(localStorage.getItem('submeddit'));

//createSubmeddit
export const createSubmeddit = createAsyncThunk('submeddits/createSubmeddit', async (submedditData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        dispatch(setGlobalLoading(true));

        const data = await submedditsAPI.createSubmeddit(submedditData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to create Submeddit');
    } finally {
        dispatch(setGlobalLoading(false));
    }
});

//deleteSubmeddit
export const deleteSubmeddit = createAsyncThunk('submeddits/deleteSubmeddit', async (submedditId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        dispatch(setGlobalLoading(true));

        const data = await submedditsAPI.deleteSubmeddit(submedditId);
        return submedditId; //Return the ID so it can be removed from state
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Unable to delete Submeddit');
    } finally {
        dispatch(setGlobalLoading(false));
    }
});

//fetchAllSubmeddits
export const fetchAllSubmeddits = createAsyncThunk('submeddits/fetchAll', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        dispatch(setGlobalLoading(true));

        const data = await submedditsAPI.fetchAllSubmeddits();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Submeddits not found');
    } finally {
        dispatch(setGlobalLoading(false));
    }
  });

//fetchSubmeddit
export const fetchSubmeddit = createAsyncThunk('submeddits/fetchSubmeddit', async (submedditId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        dispatch(setGlobalLoading(true));

        const data = await submedditsAPI.fetchSubmeddit(submedditId);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Submeddit not found');
    } finally {
        dispatch(setGlobalLoading(false));
    }
});

//followSubmeddit
export const followSubmeddit = createAsyncThunk('submeddit/followSubmeddit', async (submedditId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        dispatch(setGlobalLoading(true));

        const data = await submedditsAPI.followSubmeddit(submedditId);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Unable to follow Submeddit')
    } finally {
        dispatch(setGlobalLoading(false));
    }
});

const submedditsSlice = createSlice({
    name: 'submeddit',
    initialState: {
        submeddits: [],
        searchedSubmeddit: submeddit || null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetSubmedditState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.searchedSubmeddit = null;
        },
    },
    extraReducers: builder => {
        builder
            //createSubmeddit
            .addCase(createSubmeddit.pending, state => {
                state.loading = true;
            })
            .addCase(createSubmeddit.fulfilled, (state, action) => {
                state.loading = false;
                state.submeddits.push(action.payload);
                state.error = null;
                state.success = true;
            })
            .addCase(createSubmeddit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //deleteSubmeddit
            .addCase(deleteSubmeddit.pending, state => {
                state.loading = true;
            })
            .addCase(deleteSubmeddit.fulfilled, (state, action) => {
                state.submeddits = state.submeddits.filter(submeddit => submeddit.id !== action.payload);
            })
            .addCase(deleteSubmeddit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetchAllSubmeddits
            .addCase(fetchAllSubmeddits.pending, state => {
                state.loading = true;
            })
            .addCase(fetchAllSubmeddits.fulfilled, (state, action) => {
                state.loading = false;
                state.submeddits = action.payload;
                state.success = true;
            })
            .addCase(fetchAllSubmeddits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetchSubmeddit
            .addCase(fetchSubmeddit.pending, state => {
                state.loading = true;
            })
            .addCase(fetchSubmeddit.fulfilled, (state, action) => {
                state.loading = false;
                state.searchedSubmeddit = action.payload;
                localStorage.setItem('submeddit', JSON.stringify(action.payload));
                state.success = true;
            })
            .addCase(fetchSubmeddit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //followSubmeddit
            .addCase(followSubmeddit.pending, state => {
                state.loading = true;
            })
            .addCase(followSubmeddit.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                //Code below updates the submeddit when followed
                const updated = action.payload;
                state.submeddits = state.submeddits.map(submeddit => submeddit.id === updated.id ? updated : submeddit);
                if (state.searchedSubmeddit?.id === updated.id) {
                    state.searchedSubmeddit = updated;
                }
            })
            .addCase(followSubmeddit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetSubmedditState } = submedditsSlice.actions;

export default submedditsSlice.reducer;