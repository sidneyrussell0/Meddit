//Submeddit Page
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSubreddits } from '../../app/reddit';
import './Submeddits.css';

const Submeddits = () => {
    const [subreddits, setSubreddits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubreddits = async () => {
            try {
                const data = await getSubreddits();
                setSubreddits(data);
            } catch (err) {
                setError('Failed to load subreddits');
            } finally {
                setLoading(false);
            }
        };
        fetchSubreddits();
    }, []);

    if (loading) return <p>Loading subreddits...</p>
    if (error) return <p>{error}</p>;

    return (
        <div className='submeddits-list'>
            <h2>Popular Submeddits</h2>
            <ul>
                {subreddits.map((sub) => (
                    <li key={sub.id}>
                        <Link to={`/r/${sub.display_name}`}>
                            <img 
                                src={sub.icon_img || '/Images/default.png'}
                                alt={sub.display_name}
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