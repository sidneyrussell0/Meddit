import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROOT } from '../../app/reddit';

//fetchAllProfiles
export const fetchAllProfiles = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/user`);
        if (!res.ok) throw new Error('Unable to fetch users');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  });

//fetchProfile
export const fetchProfile = createAsyncThunk('user/fetchProfile', async (userId, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/user/${userId}`);
        if (!res.ok) throw new Error('Unable to fetch user');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//loadUserByEmail
export const loadUserByEmail = createAsyncThunk('user/loadUserByEmail', async (email, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/user/${email}`);
        if (!res.ok) throw new Error('Unable to load user');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

//followUser
export const followUser = createAsyncThunk('user/followUser', async (email, thunkAPI) => {
    try {
        const res = await fetch(`${API_ROOT}/user/${email}/follow`, {
            method: 'POST',
        });
        if (!res.ok) throw new Error('Unable to follow user');
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        profiles: [],
        currentUser: null,
        searchedUser: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetUserState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.searchedUser = null;
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
            //fetchAllProfiles
            .addCase(fetchAllProfiles.pending, setPending)
            .addCase(fetchAllProfiles.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.profiles = action.payload;
            })
            .addCase(fetchAllProfiles.rejected, setRejected)

            //fetchProfile
            .addCase(fetchProfile.pending, setPending)
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.currentUser = action.payload;
            })
            .addCase(fetchProfile.rejected, setRejected)

            //loadUserByEmail
            .addCase(loadUserByEmail.pending, setPending)
            .addCase(loadUserByEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.searchedUser = action.payload;
            })
            .addCase(loadUserByEmail.rejected, setRejected)

            //followUser
            .addCase(followUser.pending, setPending)
            .addCase(followUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const updated = action.payload;
                const matchId = updated.id || updated._id;

                //Update profiles list
                state.profiles = state.profiles.map((profiles) =>
                    (profiles.id || profiles._id) === matchId ? updated : profiles);

                //Update searchedUser if it's the same one
                if (state.searchedUser && (state.searchedUser.id || state.searchedUser._id) === matchId) {
                    state.searchedUser = updated;
                }

                //Update currentUser if it's the same one
                if (state.currentUser && (state.currentUser.id || state.currentUser._id) === matchId) {
                    state.currentUser = updated;
                }
            })
            .addCase(followUser.rejected, setRejected);
    },
});


export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;