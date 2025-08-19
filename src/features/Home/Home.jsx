//HomePage
import React from 'react';
import './Home.css';
import Post from '../post/Post';


const Home = () => {
  return (
      <div className='home-container'>
        <h2 className='section-title'>Latest Posts</h2>
        <Post subreddit ='javascript' />
      </div>
  );
};

export default Home;