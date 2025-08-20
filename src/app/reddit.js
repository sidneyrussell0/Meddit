export const API_ROOT = 'https://www.reddit.com';

export const getSubredditPosts = async (subreddit) => {
  const response = await fetch(`${API_ROOT}/${subreddit}.json`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (permalink) => {
  const response = await fetch(`${API_ROOT}${permalink}.json`);
  const json = await response.json();

  return json[1].data.children.map((subreddit) => subreddit.data);
};

export const searchReddit = async (query) => {
  const response = await fetch(`${API_ROOT}/search.json?q=${query}&limit=20`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
}