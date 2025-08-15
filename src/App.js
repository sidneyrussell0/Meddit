//make sure to update with all paths
//ADD CREATE POST LINK

//Main
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../shared/utilities/Error/ErrorMessage';
import { clearError } from '../shared/utilities/Error/errorSlice';
import Loading from '../shared/utilities/LoadingSpinner';
import './App.css';

//Home&Layout
import Home from '../shared/Home';
import Layout from '../shared/layout/Layout';

//Nav
import About from '../features/about/About';
import Help from '../features/help/Help';
import Settings from '../features/settings/Settings';

//Features
import AuthForm from '../features/auth/Auth';
import PostDetail from '../features/posts/PostDetail';
import SearchResults from '../features/search/SearchResults';
import SubmedditPage from '../features/submeddits/SubmedditPage';
import Submeddits from '../features/submeddits/Submeddits';
import TopicPage from '../features/topics/TopicPage';
import UserProfile from '../features/users/UserProfile';


function App() {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.error.message);
    const globalLoading = useSelector((state) => state.ui.globalLoading);

    //Backend OAuth
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const username = params.get('username');
    
        if (token) {
            localStorage.setItem('reddit_token', token);
        }
        if (username) {
            localStorage.setItem('reddit_username', username);
        }
        if (token || username) {
            window.history.replaceState({}, document.title, '/');
        }
      }, []);

    return(
        <>
            <ErrorMessage 
                message={errorMessage}
                onClose={() => dispatch(clearError())}
            />
            {globalLoading && <Loading />}
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/* Home/Main */}
                        <Route path="/" element={<Home />} />

                        {/* Header */}
                        <Route path="/login" element={<AuthForm />} />
                        <Route path="/search" element={<SearchResults />} />

                        {/* Nav */}
                        <Route path="/about" element={<About />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/settings" element={<Settings />} />

                        {/* Features */}
                        <Route path='/posts/:id' element={<PostDetail />} />
                        <Route path="/m/:submeddit" element={<Submeddits />} />
                        <Route path="/m/:submeddit/:name" element={<SubmedditPage />} />
                        <Route path='/topics/:topic' element={<TopicPage />} />
                        <Route path="/u/:username" element={<UserProfile />} />
                    </Route>

                    {/* Outside layout */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </Router>
         </>
    );
}

export default App;
