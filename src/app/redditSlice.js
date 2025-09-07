import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubredditPosts, getPostComments } from './reddit';

//Get posts from subreddit
export const fetchSubredditPosts = createAsyncThunk('post/fetchSubredditPosts', async (subreddit, thunkAPI) => {
  try {
    const posts = await getSubredditPosts(subreddit);
    return posts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//Get comments for a specific post
export const fetchComments = createAsyncThunk('post/fetchComments', async (permalink, thunkAPI) => {
  try {
      const comments = await getPostComments(permalink);
      return comments;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
  }
});

// We are adding showingComments and comments as additional fields to 
//handle showing them when the user wants to. We need to do this because we need 
//to call another API endpoint to get the comments for each post.
export const postsWithMetadata = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
    dispatch(getPostsSuccess(postsWithMetadata));
  } catch (error) {
    dispatch(getPostsFailed());
  }
};

//Select posts
export const selectPosts = (state) => state.reddit.posts;

//Search
export const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) =>
  state.reddit.selectedSubreddit;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== '') {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return posts;
  }
);

const redditSlice = createSlice({
  name: 'reddit',
  initialState = {
    posts: [],
    comments: [],
    searchTerm: '',
    selectedSubreddit: '/r/pics/',
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    addLocalPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
    //fetchSubredditPosts
    .addCase(fetchSubredditPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(fetchSubredditPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.posts = [...state.posts, ...action.payload];
    })
    .addCase(fetchSubredditPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //fetchComments
    .addCase(fetchComments.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.searchedPost = action.payload;
    })
    .addCase(toggleShowingComments, (state, action) => {
      state.posts[action.payload].showingComments = !state.posts[action.payload]
        .showingComments;
    })
    .addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //Search
    .addCase(setSearchTerm, (state, action) => {
      state.searchTerm = action.payload;
    })

     //Selected
    .addCase(setSelectedSubreddit, (state, action) => {
      state.selectedSubreddit = action.payload;
      state.searchTerm = '';
    })
  },
});


export const { addLocalPost } = redditSlice.actions;
export default redditSlice.reducer;