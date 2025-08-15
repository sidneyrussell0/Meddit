import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROOT } from '../../app/reddit';

//createSubmeddit
export const createSubmeddit = createAsyncThunk('submeddit/createSubmeddit', async (submedditData, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/submeddit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submedditData),
        });
        if (!res.ok) throw new Error('Failed to create Submeddit')
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//deleteSubmeddit
export const deleteSubmeddit = createAsyncThunk('submeddit/deleteSubmeddit', async (submedditId, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/submeddit/${submedditId}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Unable to delete Submeddit');
        return submedditId; //Return the ID so it can be removed from state
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//fetchAllSubmeddits
export const fetchAllSubmeddits = createAsyncThunk('submeddit/fetchAll', async (_, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/submeddit`);
        if (!res.ok) throw new Error('Failed to fetch Submeddits');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  });

//fetchSubmeddit
export const fetchSubmeddit = createAsyncThunk('submeddit/fetchSubmeddit', async (submedditId, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/submeddit/${submedditId}`);
        if (!res.ok) throw new Error('Submeddit not found');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//followSubmeddit
export const followSubmeddit = createAsyncThunk('submeddit/followSubmeddit', async (submedditId, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/submeddit/${submedditId}/follow`, {
            method: 'POST',
        });
        if (!res.ok) throw new Error('Unable to follow Submeddit');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const submedditSlice = createSlice({
    name: 'submeddit',
    initialState: {
        submeddits: [],
        searchedSubmeddit: null,
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
            //createSubmeddit
            .addCase(createSubmeddit.pending, setPending)
            .addCase(createSubmeddit.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.submeddits.push(action.payload);
            })
            .addCase(createSubmeddit.rejected, setRejected)

            //deleteSubmeddit
            .addCase(deleteSubmeddit.pending, setPending)
            .addCase(deleteSubmeddit.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.submeddits = state.submeddits.filter(submeddit => submeddit.id !== action.payload);
            })
            .addCase(deleteSubmeddit.rejected, setRejected)

            //fetchAllSubmeddits
            .addCase(fetchAllSubmeddits.pending, setPending)
            .addCase(fetchAllSubmeddits.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.submeddits = action.payload;
            })
            .addCase(fetchAllSubmeddits.rejected, setRejected)

            //fetchSubmeddit
            .addCase(fetchSubmeddit.pending, setPending)
            .addCase(fetchSubmeddit.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.searchedSubmeddit = action.payload;
            })
            .addCase(fetchSubmeddit.rejected, setRejected)

            //followSubmeddit
            .addCase(followSubmeddit.pending, setPending)
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
            .addCase(followSubmeddit.rejected, setRejected);
    },
});

export const { resetSubmedditState } = submedditSlice.actions;

export default submedditSlice.reducer;