import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice';
import redditReducer from '../app/redditSlice';
import subRedditReducer from '../features/submeddits/subRedditSlice';
import userReducer from '../features/user/userSlice';
import searchReducer from '../features/search/searchSlice';

const store = configureStore({
    reducer: {
        post: postReducer,
        reddit: redditReducer,
        subreddits: subRedditReducer, //API
        user: userReducer,
        search: searchReducer,
    },
});

export default store;