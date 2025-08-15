import React from 'react';
import Header from '../Header/Header';
import './Help.css';

const Help = () => {
    return (
        <>
            <Header />
            <div className='help-container'>
                <h1>Help & FAQ</h1>

                <section className='help-text'>
                    <h2>How to Browse Subreddits?</h2>
                    <p>You can browse subreddits by typing their name in the search bar or clicking on subreddit links on the homepage.</p>
                </section>

                <section className='help-text'>
                    <h2>How Likes Work:</h2>
                    <p>Click the 'thumbs-up' icon on a post and click again to un-like.</p>
                </section>

                <section className='help-text'>
                    <h2>Still Need Help?</h2>
                    <p>
                        Contact us via <a href='mailto:sidneyrussell58@gmail.com'>support@redditclone.com</a>
                    </p>
                </section>
            </div>
        </>
    );
};

export default Help;