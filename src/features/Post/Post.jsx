//Shows full post content
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubredditPosts } from './postSlice';
import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';

const Post = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subreddit } = useParams();
    const { posts, loading, error } = useSelector((state) => state.post);

    //Fetch Reddit posts
    useEffect(() => {
        if (subreddit) {
            dispatch(fetchSubredditPosts(`r/${subreddit}`));
        }
    }, [dispatch, subreddit]);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error: {error}</p>;

    //Combines local posts and Reddit posts
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

    return (
        <div className='post-list'>
            <h2>Posts from r/{subreddit}</h2>
            {sortedPosts.map((post) => (
                <div 
                    key={post.id} 
                    className='post-card' 
                    onClick={() => navigate(`/discussion/${subreddit}/${post.id}`, { state: post })}
                >
                    <h3>{post.title}</h3>
                    {post.selftext && <p>{post.selftext}</p>}
                    <small>
                        Post by {post.author} | {post.ups} | {post.num_comments}
                    </small>
                </div>
            ))}
        </div>
    );
};

export default Post;