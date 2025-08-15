//Need to connect to server.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment, deleteComment, fetchComment, likeComment, resetCommentState } from './commentsSlice';


const CommentComponent = () => {
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState('');
    const [searchComment, setSearchComment] = useState('');
    const [commentIdToDelete, setCommentIdToDelete] = useState('');
    const { comments, searchedComment, loading, error, success } = useSelector(state => state.comments);

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                dispatch(resetCommentState());
            }, 3000); //3 Seconds later

            return () => clearTimeout(timer);
        }
    }, [success, error, dispatch]);

    const handleCreateComment = () => {
        if (!newComment.trim()) return;
        dispatch(createComment(newComment));
        setNewComment(''); //Clears the input
    };

    const handleSearch = () => {
        if (!newComment.trim()) return;
        dispatch(fetchComment(newComment));
    };

    const handleLike = (commentId) => {
        dispatch(likeComment(commentId));
    };

    const handleDelete = () => {
        if (!commentIdToDelete.trim()) return;
        dispatch(deleteComment(commentIdToDelete));
        setCommentIdToDelete('');
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {success && <p>Success!</p>}

            {/* Searched Comment*/}
            {searchedComment && (
                <div>
                    <h4>Searched Comment:</h4>
                    <p>{searchComment.text} - Likes: {searchComment.likes || 0}</p>
                    <button onClick={() => handleLike(searchedComment.id)}>Like</button>
                </div>
            )}

            {/* Displays all Comments*/}
            {comments && comments.length > 0 && (
                <div>
                    <h3>Comments:</h3>
                    {comments.map((c) => (
                        <div key={c.id}>
                            <p>{c.text} - Likes: {c.likes || 0}</p>
                            <button onClick={() =>handleLike(c.id)}>Like</button>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Comment Input */}
            <input 
                type='text'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='Write a Comment'
            />
            <button onClick={handleCreateComment}>Create Comment</button>
            
            {/* Search Comment Input */}
            <input 
                type='text'
                value={searchComment}
                onChange={(e) => setSearchComment(e.target.value)}
                placeholder='Search Comment'
            />
            <button onClick={handleSearch}>Search Comment</button>

            {/* Delete Comment Input */}
            <input
                type='text'
                value={commentIdToDelete}
                onChange={(e) => setCommentIdToDelete(e.target.value)}
                placeholder='Comment to Delete'
            />
            <button onClick={handleDelete}>Delete Comment</button>
        </div>
    );
};
   
export default CommentComponent;