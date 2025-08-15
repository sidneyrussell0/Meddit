import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROOT } from '../../app/reddit';
import { setGlobalLoading } from '../../shared/uiSlice';

const profile = JSON.parse(localStorage.getItem('profile'));

//fetchAllProfiles
export const fetchAllProfiles = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        dispatch(setGlobalLoading(true));

        const data = await userAPI.fetchAllProfiles();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to load profiles');
    } finally {
        dispatch(setGlobalLoading(false));
    }
  });

//fetchProfile
export const fetchProfile = createAsyncThunk('user/fetchProfile', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        dispatch(setGlobalLoading(true));

        const data = await userAPI.fetchProfile();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to load profile');
    } finally {
        dispatch(setGlobalLoading(false));
    }
});

//loadUserByEmail
export const loadUserByEmail = createAsyncThunk('user/loadUserByEmail', async (email, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        dispatch(setGlobalLoading(true));

        const data = await userAPI.getUserByEmail(email);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'User not found');
    } finally {
        dispatch(setGlobalLoading(false));
    }
});

//followUser
export const followUser = createAsyncThunk('user/followUser', async (email, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        dispatch(setGlobalLoading(true));

        const data = await userAPI.followUser(email);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to follow user')
    } finally {
        dispatch(setGlobalLoading(false));
    }
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        profiles: [],
        currentUser: profile || null,
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
        builder
            //fetchAllProfiles
            .addCase(fetchAllProfiles.pending, state => {
                state.loading = true;
            })
            .addCase(fetchAllProfiles.fulfilled, (state, action) => {
                state.loading = false;
                state.profiles = action.payload;
                state.success = true;
            })
            .addCase(fetchAllProfiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetchProfile
            .addCase(fetchProfile.pending, state => {
                state.loading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                localStorage.setItem('profile', JSON.stringify(action.payload));
                state.success = true;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //loadUserByEmail
            .addCase(loadUserByEmail.pending, state => {
                state.loading = true;
            })
            .addCase(loadUserByEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.searchedUser = action.payload;
                state.success = true;
            })
            .addCase(loadUserByEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //followUser
            .addCase(followUser.pending, state => {
                state.loading = true;
            })
            .addCase(followUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                //Code below updates the profile when followed
                const updated = action.payload;
                state.profiles = state.profiles.map(profile => profile.id === updated.id ? updated : profile);
                if (state.searchedUser?.id === updated.id) {
                    state.searchedUser = updated;
                }
            })
            .addCase(followUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;