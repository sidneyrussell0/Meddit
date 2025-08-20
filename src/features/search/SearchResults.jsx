//Shows results from search
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSearchResults } from './searchSlice';


function SearchResults() {
    const { query } = useParams();
    const dispatch = useDispatch();
    const { results, loading, error } = useSelector((state) => state.search);

    useEffect(() => {
        if (query) {
            dispatch(fetchSearchResults(query));
        }
    }, [query, dispatch]);

    if (loading) return <p>Loading results...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!results.length) return <p>No results found for "{query}"</p>;

    return (
        <div className='search-results'>
            <h2>Search results for "{query}"</h2>
            {results.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}


export default SearchResults;