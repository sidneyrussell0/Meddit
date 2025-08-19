//Shows full post content plus comments
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubredditPosts, fetchComments } from './postSlice';
import { useParams } from 'react-router-dom';
import './Post.css';

const Post = () => {
    const dispatch = useDispatch();
    const { subreddit } = useParams();
    const { posts, comments, loading, error } = useSelector((state) => state.post);

    //Fetch Reddit posts
    useEffect(() => {
        dispatch(fetchSubredditPosts(`r/${subreddit}`));
    }, [dispatch, subreddit]);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error: {error}</p>;

    //Combines local posts and Reddit posts
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

    return (
        <div className='post-list'>
            {sortedPosts.map((post) => (
                <div 
                    key={post.id} 
                    className='post-card' 
                    onClick={() => dispatch(fetchComments(post.permalink))}
                >
                    <h3>{post.title}</h3>
                    {post.body && <p>{post.body}</p>}
                    <small>
                        Post by {post.author} | {post.ups} | {post.num_comments}
                    </small>

                    {/* Comment Display */}
                    {comments.length > 0 && post.permalink && (
                        <div className='comments'>
                            {comments.map((c) => (
                                <p key={c.id || c.body} className='comment'>
                                    {c.body || comments.body_html || c.data?.body}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Post;