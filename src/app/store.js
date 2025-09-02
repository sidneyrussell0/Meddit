import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice';
import subRedditReducer from '../features/submeddits/subRedditSlice';
import userReducer from '../features/user/userSlice';
import searchReducer from '../features/search/searchSlice';

const store = configureStore({
    reducer: {
        post: postReducer,
        subreddits: subRedditReducer, //API
        user: userReducer,
        search: searchReducer,
    },
});

export default store;