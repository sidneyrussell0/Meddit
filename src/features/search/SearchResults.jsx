//Results from search
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';


function SearchResults() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const location = useLocation();

    // Get ?q= value from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q') || '';
        setQuery(q);
    }, [location.search]);

    // Fetch results when query changes
    useEffect(() => {
        if (!query) return;

        const fetchResults = async () => {
            const token = localStorage.getItem('reddit_token');
            if (!token) {
                alert('No token found, please log in.');
                return;
            }

            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5000/search?q=${query}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setResults(res.data.data.children);
            } catch (err) {
                console.error(err);
                alert('Search failed');
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div>
            <h2>Search Results for "{query}"</h2>


            {!loading && results.length === 0 && query && (
                <p>No results found for '{query}'</p>
            )}

            <ul>
                {results.map(post => (
                    <li key={post.data.id}>
                        <Link to={`/posts/${post.data.id}`}>
                            {post.data.title}
                        </Link>
                        <span> - {post.data.subreddit} by {post.data.author}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default SearchResults;