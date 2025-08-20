//Reddit API
export const API_ROOT = 'https://www.reddit.com';
const PROXY = 'https://cors-anywhere.herokuapp.com/';

//Fetch posts from a subreddit
export const getSubredditPosts = async (subreddit) => {
  try {
    const response = await fetch(`${PROXY}${API_ROOT}/r/${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
  } catch (err) {
    console.error('Error fetching subreddit posts:', err);
    return [];
  }
};

//Fetch a list of subreddits
export const getSubreddits = async () => {
  try {
    const response = await fetch(`${PROXY}${API_ROOT}/subreddits.json`);
    const json = await response.json();
    return json.data.children.map((subreddit) => subreddit.data);
  } catch (err) {
    console.error('Error fetching subreddits:', err);
    return [];
  }
};

//Fetch comments for a post
export const getPostComments = async (permalink) => {
  try {
    //permalink must start with '/r/subreddit/comments/...'
    const response = await fetch(`${PROXY}${API_ROOT}${permalink}.json`);
    const json = await response.json();
    return json[1].data.children.map((c) => c.data);
  } catch (err) {
    console.error('Error fetching post comments:', err);
    return [];
  }
};

//Search Reddit
export const searchReddit = async (query) => {
  try {
    const response = await fetch(
      `${PROXY}${API_ROOT}/search.json?q=${encodeURIComponent(query)}&limit=20&raw_json=1`
    );
    const json = await response.json();
    return json.data.children.map((post) => post.data);
  } catch (err) {
    console.error('Error searching Reddit:', err);
    return [];
  }
};