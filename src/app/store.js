import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice';
import submedditReducer from '../features/submeddit/submedditSlice';
import userReducer from '../features/user/userSlice';
import commentReducer from '../features/comment/commentSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
    reducer: {
        postReducer,
        submedditReducer,
        userReducer,
        commentReducer,
        searchReducer
    },
});

export default store;