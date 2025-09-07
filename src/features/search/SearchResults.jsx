//Shows results from search
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSearchResults, setSearchTerm } from '../../app/redditSlice';


function SearchResults() {
    const { query } = useParams();
    const dispatch = useDispatch();
    
    const { searchResults, loading, error } = useSelector((state) => state.reddit);

    useEffect(() => {
        if (query) {
            dispatch(setSearchTerm(query));
            dispatch(fetchSearchResults(query));
        }
    }, [query, dispatch]);

    if (loading) return <p>Loading results...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!searchResults.length) return <p>No results found for "{query}"</p>;

    return (
        <div className='search-results'>
            <h2>Search results for "{query}"</h2>
            {results.map((post) => (
                <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.selftext || post.body}</p>
                <small>Posted by {post.author}</small>
              </div>
            ))}
        </div>
    );
}


export default SearchResults;