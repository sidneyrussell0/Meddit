import { configureStore } from '@reduxjs/toolkit';
import redditReducer from '../store/redditSlice';
import subRedditReducer from '../store/subRedditSlice';
import postReducer from '../features/post/postSlice';
import submedditReducer from '../features/submeddits/submedditSlice';
import userReducer from '../features/user/userSlice';
import searchReducer from '../features/search/searchSlice';

const store = configureStore({
    reducer: {
        reddit: redditReducer,
        subReddit: subRedditReducer,
        post: postReducer,
        submeddit: submedditReducer,
        user: userReducer,
        search: searchReducer,
    },
});

export default store;