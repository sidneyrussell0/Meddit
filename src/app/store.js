import { configureStore } from '@reduxjs/toolkit';
import redditReducer from '../store/redditSlice';
import subRedditReducer from '../store/subRedditSlice';
import postReducer from '../features/post/postSlice';
import submedditReducer from '../features/submeddits/submedditSlice';
import userReducer from '../features/user/userSlice';
import commentReducer from '../features/comment/commentSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
    reducer: {
        redditReducer,
        subRedditReducer,
        postReducer,
        submedditReducer,
        userReducer,
        commentReducer,
        searchReducer
    },
});

export default store;