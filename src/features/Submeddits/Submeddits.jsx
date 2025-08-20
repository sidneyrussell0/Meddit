//Submeddit Page
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits, resetSubmedditState } from './submedditSlice';

const SubmedditPage = () => {
    const dispatch = useDispatch();
    const { subreddits, loading, error } = useSelector((state) => state.submeddits);

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    if (loading) {
        return <p>Loading subreddits...</p>;
    }

    if (error) {
        return <p>Error loading subreddits: {error}</p>;
    }

    return (
        <div className='submeddit-page'>
            <h2>Popular Submeddits</h2>
            {subreddits.length > 0 ? (
                subreddits.map((sub) => (
                    <div key={sub.id} className='submeddit'>
                        <h3>{sub.display_name_prefixed}</h3>
                        <p>{sub.title}</p>
                        <p><small>{sub.public_description}</small></p>
                        <p>
                            Subscribers: {sub.subscribers?.toLocaleString() || 0}
                            <button style={{ marginLeft: '10px' }}>FOLLOW</button>
                        </p>
                    </div>
                ))
            ) : (
                <p>No subreddits found.</p>
            )}
        </div>
    );
};

export default SubmedditPage;