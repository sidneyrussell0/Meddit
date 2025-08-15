import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/Post/postSlice';
import submedditReducer from '../features/Submeddits/submedditSlice';
import userReducer from '../features/User/userSlice';
import commentReducer from '../features/Comment/commentSlice';
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