//Main navigation with links
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubreddit } from '../../app/redditSlice';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedSubreddit } = useSelector((state) => state.reddit);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleTopicClick = (sub) => {
    dispatch(setSelectedSubreddit(sub));
    navigate(`/r/${sub}`);
    setIsOpen(false); // close menu on mobile
  };

  return (
    <div>
      <nav className="nav">
        <button className="hamburger" onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={`nav-links ${isOpen ? 'show' : ''}`}>
          <div className="home">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/submeddits">Popular</Link></li>
            </ul>
          </div>

          <div className="topics">
            <h2>Topics</h2>
            <ul>
              <li
                className={selectedSubreddit === 'SMW' ? 'active' : ''}
                onClick={() => handleTopicClick('SMW')}
              >
                Super Mario World
              </li>
              <li
                className={selectedSubreddit === 'MarioKartWorld' ? 'active' : ''}
                onClick={() => handleTopicClick('MarioKartWorld')}
              >
                Mario Kart
              </li>
              <li
                className={selectedSubreddit === 'MARIOPARTY' ? 'active' : ''}
                onClick={() => handleTopicClick('MARIOPARTY')}
              >
                Mario Party
              </li>
              <li
                className={selectedSubreddit === 'marioandluigi' ? 'active' : ''}
                onClick={() => handleTopicClick('marioandluigi')}
              >
                Mario & Luigi
              </li>
              <li
                className={selectedSubreddit === 'WorldOfNintendo' ? 'active' : ''}
                onClick={() => handleTopicClick('WorldOfNintendo')}
              >
                Nintendo
              </li>
              <li
                className={selectedSubreddit === 'MarioCartoons' ? 'active' : ''}
                onClick={() => handleTopicClick('MarioCartoons')}
              >
                Cartoons
              </li>
            </ul>
          </div>

          <div className="about">
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/help">Help</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;