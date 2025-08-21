//Will not show body after submission
//Also need to change r/undefined to r/meddit

//Form for submitting new posts (local only)
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLocalPost } from './postSlice';
import './CreatePost.css';

const CreatePost = ({ onClose }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !body) {
            alert('Please fill in both the title and content')
            return;
        }

        const newPost = {
            id: Date.now(),
            title,
            body,
            author: 'Anonymous',
            ups: 0,
            num_comments: 0,
            permalink: `/local/${Date.now()}`,
        };

        dispatch(addLocalPost(newPost));
        setTitle('');
        setBody('');

        console.log('Post submitted:', { title, body });

        onClose();
    };

    return (
        <div className='create-post'>
            <button className='close-btn' onClick={onClose}>X</button>

            <h3>Create Post</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder='Content'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <button type='submit'>Submit</button>
            </form>
        </div> 
    );
};

export default CreatePost;