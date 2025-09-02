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
                            <li><Link to='submeddit'>Popular</Link></li>
                        </ul>
                    </div>
                    
                    <div className='topics'>
                        <h2>Topics</h2>
                        <ul>
                            <li><Link to='/r/SMW'>Super Mario World</Link></li>
                            <li><Link to='/r/MarioKartWorld'>Mario Kart</Link></li>
                            <li><Link to='/r/MARIOPARTY'>Mario Party</Link></li>
                            <li><Link to='/r/marioandluigi'>Mario & Luigi</Link></li>
                            <li><Link to='/r/WorldOfNintendo'>Nintendo</Link></li>
                            <li><Link to='/r/MarioCartoons'>Cartoons</Link></li>
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