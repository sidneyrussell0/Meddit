//Site header with logo, login, and searchbar
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuery, fetchSearchResults } from '../../features/search/searchSlice';
import CreatePost from '../../features/post/CreatePost';
import './Header.css';

const Header = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        dispatch(setQuery(input));
        dispatch(fetchSearchResults(input));
        navigate(`/search/${input}`);
    };

    const [showCreatePost, setShowCreatePost] = useState(false);
    const toggleCreatePost = () => {
        setShowCreatePost(!showCreatePost);
    };

    return (
        <div className='header'>
            <button className='create-post-btn' onClick={toggleCreatePost}>
                ➕ <span className='btn-text'>Create</span>
            </button>
            {showCreatePost && (
                <div className='modal-backdrop' onClick={toggleCreatePost}>
                    <div className='modal-content' onClick={e => e.stopPropagation()}>
                        <CreatePost onClose={toggleCreatePost} />
                    </div>
                </div>
            )}

            <div className='logo-container'>
                <img src='/logo180A.svg' alt='Meddit' className='logo' />
                <img src='/logo200.svg' alt='Meddit' className='logo-small' />
            </div>

            <form className='search-container' onSubmit={handleSubmit}>
                <input
                    className='search-input'
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Search Reddit...'
                />
                <button className='search-btn'type='submit'>🔍</button>
            </form>
        </div>
    );
};

export default Header;