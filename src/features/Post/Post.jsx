//Shows full post content
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocalPost, fetchSubredditPosts } from '../../app/redditSlice';
import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';

const Post = ({ subreddit: propSubreddit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { posts, loading, error, selectedSubreddit } = useSelector((state) => state.reddit);

    // Use prop first, fallback to URL param
    const { subreddit: paramSubreddit } = useParams();
    const activeSubreddit = propSubreddit || paramSubreddit || selectedSubreddit || 'SMW';

    //Fetch Reddit posts
    useEffect(() => {
        dispatch(fetchSubredditPosts(activeSubreddit));

        if (!posts || posts.length === 0) {
            const localPosts = [
                { id: 'local1', title: 'Super Mario World', author: 'MarioFan', body: 'Local test post 1', ups: 99, num_comments: 2, created_utc: Date.now() / 1000 },
                { id: 'local2', title: 'Peach Stuff', title: 'PeachFan', body: 'Local test post 2', ups: 50, num_comments: 0, created_utc: Date.now() / 1000 },
                { id: 'local3', title: 'Rosalina Fun', title: 'RosalinaFan', body: 'Local test post 3', ups: 2, num_comments: 5, created_utc: Date.now() / 1000 },
                { id: 'local4', title: 'Toad Adventures', title: 'ToadFan', body: 'Local test post 4', ups: 8, num_comments: 10, created_utc: Date.now() / 1000 },
            ];
            localPosts.forEach(post => dispatch(addLocalPost(post)));
        }
    }, [dispatch, activeSubreddit]);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!posts || posts.length === 0) return <p>No posts found.</p>;

    //Combines local posts and Reddit posts
    const sortedPosts = [...posts].sort((a, b) => b.created_utc - a.created_utc);

    return (
        <div className='post-list'>
            {sortedPosts.length === 0 && <p>No posts available.</p>}

            {sortedPosts.map((post) => (
                <div 
                    key={post.id || post.name} 
                    className='post-card' 
                    onClick={() => navigate(`/discussion/${activeSubreddit}/${post.id || post.name}`, { state: post })}
                >
                    <h3>{post.title}</h3>
                    {post.body && <p>{post.body}</p>}
                    {post.image && (
                        <img 
                            src={post.image}
                            alt={post.title}
                            className='post-image'
                        />
                    )}
                    <small>
                        Post by {post.author} | {post.ups} 👍 | {post.num_comments} Comments
                    </small>
                </div>
            ))}
        </div>
    );
};

export default Post;