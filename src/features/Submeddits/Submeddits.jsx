//Submeddit Page
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSubreddits } from '../../app/redditSlice';
import './Submeddits.css';

const Submeddits = () => {
    const dispatch = useDispatch();
    const { subreddits, loading, error } = useSelector((state) => state.subreddits);

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    if (loading) return <p>Loading subreddits...</p>
    if (error) return <p>{error}</p>;

    return (
        <div className='submeddits-list'>
            <h2>Popular Submeddits</h2>
            <ul>
                {subreddits.map((sub) => (
                    <li key={sub.id || sub.display_name}>
                        <Link to={`/r/${sub.display_name || sub.title}`}>
                            <img 
                                src={sub.icon_img || '/Images/default.png'}
                                alt={sub.display_name || sub.title}
                                className='subreddit-icon'
                            />
                            {sub.display_name_prefixed} - {sub.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Submeddits;