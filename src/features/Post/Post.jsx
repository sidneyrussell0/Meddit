//Shows full post content
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubredditPosts } from './postSlice';
import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';

const Post = ({ subreddit: propSubreddit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subreddit: paramSubreddit } = useParams();
    const { posts, loading, error } = useSelector((state) => state.post);

    // Use prop first, fallback to URL param
    const activeSubreddit = propSubreddit || paramSubreddit || 'SMW';

    //Fetch Reddit posts
    //
    useEffect(() => {
        dispatch(fetchSubredditPosts(activeSubreddit));
    }, [dispatch, activeSubreddit]);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error: {error}</p>;

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
                    <small>
                        Post by {post.author} | {post.ups} 👍 | {post.num_comments} Comments
                    </small>
                </div>
            ))}
        </div>
    );
};

export default Post;