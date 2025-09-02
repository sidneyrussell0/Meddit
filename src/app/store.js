import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice';
import submedditReducer from '../features/submeddits/submedditSlice';
import subRedditReducer from '../features/submeddits/subRedditSlice';
import userReducer from '../features/user/userSlice';
import searchReducer from '../features/search/searchSlice';

const store = configureStore({
    reducer: {
        post: postReducer,
        subReddit: subRedditReducer, //API
        localSubmeddits: submedditReducer, //Local test
        user: userReducer,
        search: searchReducer,
    },
});

export default store;