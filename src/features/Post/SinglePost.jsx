//Shows single post & comments
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { fetchComments } from '../../app/redditSlice';
import './Post.css';

const PostThread = () => {
    const dispatch = useDispatch();
    const { subreddit } = useParams();
    const { comments, loading, error } = useSelector((state) => state.reddit);
    const location = useLocation();
    const post = location.state; //post passed from Post.jsx

    useEffect(() => {
        if (post?.permalink) {
            dispatch(fetchComments(post.permalink));
        }
    }, [dispatch, post]);

    if (!post) return <p>Post not found.</p>;
    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='post-thread'>
            <h2>{post.title}</h2>
            {post.body && <p>{post.body}</p>}
            {post.image && (
                <img 
                src={post.image}
                alt={post.title}
                className='post-image'
                />
            )}
            <small>
                Post by {post.author} in r/{subreddit} | {post.ups} 👍 | {post.num_comments} Comments
            </small>

            <h3>Comments</h3>
            {post.comments && comments.length > 0 ? (
                post.comments.map((c) => (
                    <div key={c.id} className='comment'>
                        <p><strong>{c.author}</strong>: {c.body}</p>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export default PostThread;