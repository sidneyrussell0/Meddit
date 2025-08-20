//WORKING ON USER TO VIEW REDDIT USERNAMES AND THEIR POSTS
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPosts, resetUserState } from './userSlice';
import { useParams } from 'react-router-dom';
import './User.css';


const User = () => {
    const dispatch = useDispatch();
    const { username } = useParams();
    const { posts, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        if (username) {
            dispatch(fetchUserPosts(username));
        }
        return () => dispatch(resetUserState());
    }, [dispatch, username]);

    if (loading) return <p>Loading user posts...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!posts.length) return <p>No posts found for {username}</p>;


    return (
        <div className='user-posts'>
            <h2>Posts by {username}</h2>
            {posts.map(post => (
                <div key={post.id} className='post-card'>
                    <h3>{post.title}</h3>
                    {post.selftext && <p>{post.selftext}</p>}
                    <small>{post.ups} | {post.num_comments}</small>
                </div>
            ))}
        </div>
    );
};
   
export default User;