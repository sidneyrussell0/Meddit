import { configureStore } from '@reduxjs/toolkit';
import redditReducer from '../app/redditSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        reddit: redditReducer,
        subreddits: subRedditReducer, //API
        user: userReducer,
    },
});

export default store;