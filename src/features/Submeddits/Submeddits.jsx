//Submeddit Page
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLocalSubreddit, fetchSubreddits } from '../../app/redditSlice';
import './Submeddits.css';

const Submeddits = () => {
    const dispatch = useDispatch();
    const { subreddits, loading, error } = useSelector((state) => state.reddit);

    useEffect(() => {
        dispatch(fetchSubreddits());

        if (!subreddits || subreddits.length === 0) {
            const localSubs = [
                { id: 'local1', display_name: 'Mario', title: 'Super Mario World', display_name_prefixed: 'r/Mario', icon_img: '/Images/default.png' },
                { id: 'local2', display_name: 'EverythingPeach', title: 'Peach Stuff', display_name_prefixed: 'r/EverythingPeach', icon_img: '/Images/default.png' },
                { id: 'local3', display_name: 'Rosalina', title: 'Rosalina Fun', display_name_prefixed: 'r/Rosalina', icon_img: '/Images/default.png' },
                { id: 'local4', display_name: 'Toad', title: 'Toad Adventures', display_name_prefixed: 'r/Toad', icon_img: '/Images/default.png' },
            ];
            localSubs.forEach(sub => dispatch(addLocalSubreddit(sub)));
        }
    }, [dispatch]);

    if (loading) return <p>Loading subreddits...</p>
    if (error) return <p>{error}</p>;
    if (!subreddits || subreddits.length === 0) return <p>No subreddits found.</p>;

    const marioSubs = subreddits.filter(sub => sub.display_name.toLowerCase().includes('mario'));
    return (
        <div className="submeddits-list">
        <h2>Popular Submeddits</h2>
        <ul>
            {marioSubs.map((sub) => (
                <li key={sub.id || sub.display_name}>
                    <Link to={`/r/${sub.display_name || sub.title}`}>
                        <img
                            src={sub.icon_img || '/Images/default.png'}
                            alt={sub.display_name || sub.title}
                            className='subreddit-icon'
                        />
                        {sub.display_name_prefixed || `r/${sub.title}`}
                    </Link>
                </li>
            ))}
        </ul>
      </div>
    );
};

export default Submeddits;