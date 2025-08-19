//Form for submitting new posts
//Maybe add options to select submeddit for your post
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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