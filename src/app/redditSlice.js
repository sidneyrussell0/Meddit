import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubredditPosts, getPostComments, getSubreddits, searchReddit } from './reddit';

//Get posts from subreddit
export const fetchSubredditPosts = createAsyncThunk(
  'post/fetchSubredditPosts', 
  async (subreddit, thunkAPI) => {
  try {
    const posts = await getSubredditPosts(subreddit);
    //Metadata fields for comment handling
    return posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//Get comments for a specific post
export const fetchComments = createAsyncThunk(
  'post/fetchComments', 
  async (permalink, thunkAPI) => {
  try {
      const comments = await getPostComments(permalink);
      return { permalink, comments };
  } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
  }
});

//Get subreddits from Reddit
export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async (_, thunkAPI) => {
    try {
      const data = await getSubreddits();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });

//Search
export const fetchSearchResults = createAsyncThunk(
  'reddit/fetchSearchResults',
  async (query, thunkAPI) => {
    try {
      const results = await searchReddit(query);
      return results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });

const redditSlice = createSlice({
  name: 'reddit',
  initialState: {
    posts: [],
    comments: [],
    subreddits: [],
    searchResults: [],
    searchTerm: '',
    selectedSubreddit: '/r/SMW/',
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    addLocalPost: (state, action) => {
      state.posts.push(action.payload);
    },
    toggleShowingComments: (state, action) => {
      const postIndex = action.payload;
      state.posts[postIndex].showingComments =
        !state.posts[postIndex].showingComments;
    },
    addLocalSubreddit: (state, action) => {
      state.subreddits.push(action.payload);
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
      state.searchTerm = '';
    },
  },
  extraReducers: builder => {
    builder
      //Subreddit posts
      .addCase(fetchSubredditPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.posts = [];
      })
      .addCase(fetchSubredditPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts = action.payload;
      })
      .addCase(fetchSubredditPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        //Finds post and attaches comments
        const { permalink, comments } = action.payload;
        const post = state.posts.find((p) => p.permalink === permalink);
        if (post) {
          post.comments = comments;
          post.loadingComments = false;
        }
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Subreddits
      .addCase(fetchSubreddits.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = [];
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Search
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchResults = [];
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});


export const { addLocalPost, toggleShowingComments, addLocalSubreddit, setSearchTerm, setSelectedSubreddit } = redditSlice.actions;
export default redditSlice.reducer;