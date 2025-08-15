//Main navigation with links
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div>
            <nav className='nav'>
                <button className='hamburger' onClick={toggleMenu}>
                    &#9776;
                </button>
                <div className={`nav-links ${isOpen ? 'show' : ''}`}>
                    <div className='home'>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/submeddits'>Submeddits</Link></li>
                        </ul>
                    </div>
                    
                    <div className='topics'>
                        <h2>Topics</h2>
                        <ul>
                            <li><Link to='/games'>Games</Link></li>
                            <li><Link to='/q-and-as'>Q&As</Link></li>
                            <li><Link to='/art-anime'>Art & Anime</Link></li>
                            <li><Link to='/food-drink'>Food & Drink</Link></li>
                            <li><Link to='/music'>Music</Link></li>
                            <li><Link to='/news'>News</Link></li>
                        </ul>
                    </div>

                    <div className='about'>
                        <ul>
                            <li><Link to='/about'>About</Link></li>
                            <li><Link to='/help'>Help</Link></li>
                            <li><Link to='/settings'>Settings</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default NavBar;