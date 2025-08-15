import React from 'react';
import Header from '../Header/Header';
import './About.css';

const About = () => {
    return (
        <>
            <Header />
            <div className='about-container'>
                <h1>About This App</h1>

                <p>This is a Reddit-style web app where users can browse subreddits, read posts, upvote/downvote, and interact with the community.</p>

                <h2>Features</h2>
                <ul>
                    <li>- Browse top posts from subreddits -</li>
                    <li>- Like posts -</li>
                    <li>- View post details and comments -</li>
                    <li>- Dark mode support -</li>
                </ul>

                <h2>Technologies Used</h2>
                <ul>
                    <li>- React -</li>
                    <li>- Reddit API -</li>
                    <li>- CSS -</li>
                </ul>

                <h2>Author</h2>
                <p>
                    Built by Sidney Russell. Find the source code on {''}
                    <a href='https://github.com/sidneyrussell0/Meddit.git'>
                        GitHub
                    </a>.
                </p>
            </div>
        </>
    );
};

export default About;