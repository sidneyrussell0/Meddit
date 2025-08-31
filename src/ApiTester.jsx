//Tests the Reddit API w/ PROXY
import { useEffect } from 'react';
import {
    getSubredditPosts,
    getSubreddits,
    getPostComments,
    searchReddit,
} from './app/reddit';

function ApiTester() {
    useEffect(() => {
        (async () => {
            //Test subreddit posts
            const posts = await getSubredditPosts('cats');
            console.log('Posts from r/cats:', posts);

            //Test subreddits list
            const subs = await getSubreddits();
            console.log('List of subreddits:', subs);

            //Test search
            const results = await searchReddit();
            console.log('Search results for dogs:', results);

            //Test comments (grab permalink from one of the posts above)
            if (posts[0]?.permalink) {
                const comments = await getPostComments(posts[0].permalink);
                console.log('Comments for first post:', comments);
            }
        })();
    }, []);

    return <div>Check the browser console for API test results.</div>;
}

export default ApiTester;