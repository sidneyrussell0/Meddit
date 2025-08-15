//Single submeddit preview (name, description, follower count)
//Need to connect to server
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../shared/utilities/LoadingSpinner';

const SubmedditPage = () => {
    const { name } = useParams();
    const [submeddit, setSubmeddit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmeddit = async () => {
            try {
                const token = localStorage.getItem('reddit_token');
                if (!token) {
                    alert('No token found, please log in.');
                    return;
                }

                const res = await axios.get(`http://localhost:5000/submeddit/${name}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setSubmeddit(res.data);
            } catch (err) {
                console.error(err);
                alert('Failed to load Submeddit');
            } finally {
                setLoading(false);
            }
        };

        fetchSubmeddit();
    }, [name]);

    if (loading) return <Loading />
    if (!submeddit) return <p>Submeddit not found.</p>;

    return (
        <div className='submeddit-page'>
        <h3>m/{submeddit.title}</h3>
        <p><small>u/{submeddit.author}</small></p>
        <p>
            <small>Followers: {submeddit.follows || 0}</small>
            <button style={{ marginLeft: '10px' }}>FOLLOW</button>
        </p>

        <h3>Feed</h3>
        {submeddit.posts && submeddit.posts.length > 0 ? (
            submeddit.posts.map((post) => (
                <div key={post.id} className='post'>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                    <p><small>u/{post.author}</small></p>
                    <p>
                        <small>Likes: {post.likes || 0}</small>
                        <button style={{ marginLeft: '10px' }}>LIKE</button>
                    </p>
                </div>
            ))
        ) : (
            <p>No posts yet.</p>
        )}
    </div>
    );
};

export default SubmedditPage;