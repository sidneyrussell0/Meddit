import { configureStore } from '@reduxjs/toolkit';
import redditReducer from '../app/redditSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        reddit: redditReducer,
        user: userReducer,
    },
});

export default store;