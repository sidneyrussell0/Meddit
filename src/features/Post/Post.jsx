//Shows full post content plus comments
import React from 'react';
import { useParams } from 'react-router-dom';

const mockPosts = [
    { id: '1', title: 'First Post', body: 'This is the first post.', author: 'user1', likes: 5 },
    //add more for testing
];

const PostDetail = ({ onClick, onLike }) => {
    const { id } = useParams();

    const post = mockPosts.find(p => p.id === id);

    if (!post) return <p>Post not found.</p>

    return (
        <div className='post-detail' onClick={() => onClick?.(post, post.comments)}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p><small>u/{post.author}</small></p>
            <p>
                <small>Likes: {post.likes || 0}</small>
                <button 
                    onClick={(e) => {
                        e.stopPropagation(); //prevents triggering onClick for when you click the button
                        onLike?.(post.id);
                    }}
                    style={{ marginLeft: '10px' }}
                >
                    LIKE
                </button>
            </p>

            <h3>Comment</h3>
            {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                    <div key={index} className='comment'>
                        <p>{comment.body}</p>
                        <p><small>u/{comment.author}</small></p>
                        <p><small>{comment.like}</small></p>
                        <p>
                            <small>Likes: {comment.likes || 0}</small>
                            <button 
                                onClick={(e) => {
                                e.stopPropagation(); //prevents triggering onClick for when you click the button
                                onLike?.(comment.id);
                                }}
                                style={{ marginLeft: '10px' }}
                            >
                                LIKE
                            </button>
                        </p>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export default PostDetail;