//Reddit JSON API (frontend only)
const API_ROOT = 'https://www.reddit.com';

//Normalize a Reddit post for Meddit's format
const formatPost = (post) => ({
  id: post.id,
  title: post.title,
  body: post.selftext || '',
  author: post.author,
  ups: post.ups,
  num_comments: post.num_comments,
  image: post.url_overridden_by_dest?.match(/\.(jpg|png|gif)$/i)
    ? post.url_overridden_by_dest
    : null,
  created_utc: post.created_utc,
});

//Fetch posts from a subreddit
export const getSubredditPosts = async (subreddit) => {
  try {
    const response = await fetch(`${API_ROOT}/r/${subreddit}.json`);
    const json = await response.json();

    return json.data.children.map((child) => formatPost(child.data));
  } catch (err) {
    console.error('Error fetching subreddit posts:', err);
    return [];
  }
};

//Fetch a list of subreddits
export const getSubreddits = async () => {
  try {
    const response = await fetch(`${API_ROOT}/subreddits.json`);
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
    const response = await fetch(`${API_ROOT}${permalink}.json`);
    const json = await response.json();

    return json[1].data.children
    .filter((c) => c.kind === 't1')
    .map((c) => {
      const comment = c.data;
      return {
        id: comment.id,
        body: comment.body,
        author: comment.author,
        ups: comment.ups,
        created_utc: comment.created_utc,
      };
    });
  } catch (err) {
    console.error('Error fetching post comments:', err);
    return [];
  }
};

//Search Reddit
export const searchReddit = async (query) => {
  try {
    const response = await fetch(
      `${API_ROOT}/search.json?q=${encodeURIComponent(query)}&limit=20&raw_json=1`
    );
    const json = await response.json();

    return json.data.children.map((child) => formatPost(child.data));
  } catch (err) {
    console.error('Error searching Reddit:', err);
    return [];
  }
};
