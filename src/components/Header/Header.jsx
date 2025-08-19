//Site header with logo, login, and searchbar
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../../features/post/CreatePost';
import './Header.css';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const [showCreatePost, setShowCreatePost] = useState(false);
    const toggleCreatePost = () => {
        setShowCreatePost(!showCreatePost);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
        }
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

            <form className='search-container' onSubmit={handleSearchSubmit}>
                <input
                    className='search-input'
                    type='text'
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder='Search...'
                />
                <button className='search-btn'type='submit'>🔍</button>
            </form>
        </div>
    );
};

export default Header;